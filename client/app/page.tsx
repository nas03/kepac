'use client';

import { getRasterLayer } from '@/api/georaster';
import { demoTime } from '@/data/time-demo';
import type { RasterData } from '@/types';
import { InfoOutlined } from '@mui/icons-material';
import { Button, Divider, Popover } from 'antd';
import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';
import {
	createContext,
	memo,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';
import { useMap } from 'react-leaflet';
// Dynamic imports for all components
const MapContainer = dynamic(
	() => import('react-leaflet').then((mod) => mod.MapContainer),
	{ ssr: false }
);

const TileLayer = dynamic(
	() => import('react-leaflet').then((mod) => mod.TileLayer),
	{ ssr: false }
);

const GeoTIFFLayer = dynamic(
	() => import('@/components').then((mod) => mod.GeoTIFFLayer),
	{ ssr: false }
);

const HighlightRegion = dynamic(
	() => import('@/components').then((mod) => mod.HighlightRegion),
	{ ssr: false }
);

const InfoTip = dynamic(
	() => import('@/components').then((mod) => mod.InfoTip),
	{ ssr: false }
);

const RankInfo = dynamic(
	() => import('@/components').then((mod) => mod.RankInfo),
	{ ssr: false }
);

const TimeSlider = dynamic(
	() => import('@/components').then((mod) => mod.TimeSlider),
	{ ssr: false }
);

const GradientScale = dynamic(() => import('@/components/GradientScale'), {
	ssr: false,
});
// Context definitions
const TimeContext = createContext<{
	time: number;
	setTime: (value: number) => void;
} | null>(null);

const PrecipitationContext = createContext<{
	precipitation: number;
	setPrecipitation: (value: number) => void;
} | null>(null);

interface ExternalProps {
	toggle: {
		precipitation: boolean;
		warn: boolean;
	};
}

const External = dynamic(
	() => {
		const ExternalComponent = ({ toggle }: ExternalProps) => {
			const map = useMap();
			const [rasterLayer, setRasterLayer] = useState<RasterData>({
				layer: null,
				georaster: null,
			});
			const { time } = useContext(TimeContext)!;

			useEffect(() => {
				getRasterLayer(demoTime[time / 2]).then((rasterLayer) => {
					setRasterLayer(rasterLayer);
				});
			}, [time]);

			interface RasterLayer {
				rasters: unknown;
				georasters: unknown;
			}
			interface HighlightLayer extends L.Layer {
				defaultOptions?: {
					attribution?: string;
				};
			}

			const isRasterLayer = (layer: unknown): layer is RasterLayer => {
				return (
					typeof layer === 'object' &&
					layer !== null &&
					'rasters' in layer &&
					'georasters' in layer
				);
			};

			useEffect(() => {
				if (!toggle.precipitation) {
					map.eachLayer((layer) => {
						if (isRasterLayer(layer)) {
							map.removeLayer(layer);
						}
					});
				}
				if (!toggle.warn) {
					map.eachLayer((layer) => {
						if (
							(layer as HighlightLayer).defaultOptions?.attribution ===
							'highlightRegion'
						) {
							map.removeLayer(layer);
						}
					});
				}
			}, [toggle, map]);

			return (
				<>
					<GeoTIFFLayer
						toggle={toggle.precipitation}
						map={map}
						georaster={rasterLayer}
					/>
					<HighlightRegion toggle={toggle.warn} time={time} map={map} />
				</>
			);
		};

		return Promise.resolve(ExternalComponent);
	},
	{ ssr: false }
);

const LeafletMap = () => {
	const latitude = 17.9459;
	const longitude = 105.97;

	const [time, setTime] = useState(0);
	const [precipitation, setPrecipitation] = useState<number>(0);
	const [toggle, setToggle] = useState({
		precipitation: true,
		warn: false,
	});

	const handleTimeChange = useCallback((newTime: number) => {
		setTime(newTime);
	}, []);

	const handleToggleLayer = useCallback(
		(newToggle: { precipitation?: boolean; warn?: boolean }) => {
			setToggle((prev) => ({ ...prev, ...newToggle }));
		},
		[]
	);

	// Memoized OverlayLayer
	const OverlayLayer = memo(() => {
		const { time } = useContext(TimeContext)!;
		return (
			<div className="absolute z-[10000] ml-[1rem] mt-[5rem] max-h-[95vh]">
				<RankInfo toggle={toggle} onToggle={handleToggleLayer} time={time} />
			</div>
		);
	});
	OverlayLayer.displayName = 'OverlayLayer';

	// Memoized RightOverlayLayer
	const RightOverlayLayer = memo(() => {
		const Header = () => (
			<>
				<h1 className="text-xl font-bold">Chú thích</h1>
				<Divider className="mt-2" />
			</>
		);

		return (
			<div className="absolute right-0 z-[10000] mr-[1rem] h-[95vh]">
				<div className="relative top-[4rem] float-right w-fit">
					<Popover
						content={<InfoTip />}
						style={{ padding: '2rem' }}
						className="mt-[3rem] rounded-xl"
						title={<Header />}
						placement="left">
						<Button
							type="default"
							className="rounded-full"
							icon={<InfoOutlined />}
						/>
					</Popover>
				</div>
				<div className="relative top-[75%] float-right w-fit">
					<GradientScale toggle={toggle} />
				</div>
			</div>
		);
	});
	RightOverlayLayer.displayName = 'RightOverlayLayer';

	return (
		<>
			{/* <LeafletCSS /> */}
			<TimeContext.Provider value={{ time, setTime }}>
				<OverlayLayer />
				<RightOverlayLayer />
				<PrecipitationContext.Provider
					value={{ precipitation, setPrecipitation }}>
					<MapContainer
						center={[latitude, longitude]}
						zoom={7}
						style={{ width: '100vw', height: '95vh' }}>
						<TileLayer
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>
						<External toggle={toggle} />
					</MapContainer>
					<TimeSlider onTimeChange={handleTimeChange} initialTime={time} />
				</PrecipitationContext.Provider>
			</TimeContext.Provider>
		</>
	);
};

export default LeafletMap;
