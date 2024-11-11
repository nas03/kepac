import { GradientScale, RankInfo } from "@/app/import";
import { TimeContext } from "@/context/context";
import { InfoOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Divider, Popover } from "antd";
import { useContext } from "react";
import InfoTip from "./InfoTip";

interface IRightOverlayLayerProps {
  toggle: {
    precipitation: boolean;
    warn: boolean;
  };
  handleToggleLayer: (newToggle: { precipitation?: boolean; warn?: boolean }) => void;
}
const RightOverlayLayer: React.FC<IRightOverlayLayerProps> = ({ toggle, handleToggleLayer }) => {
  const Header = () => (
    <>
      <h1 className="text-xl font-bold">Chú thích</h1>
      <Divider className="mt-2" />
    </>
  );
  const { time } = useContext(TimeContext)!;
  return (
    <>
      <div className="absolute right-0 z-[10000] mr-[1rem] top-[4rem] float-right w-fit">
        <Popover
          content={<InfoTip />}
          style={{ padding: "2rem" }}
          className="mt-[3rem] rounded-xl"
          title={<Header />}
          placement="left"
        >
          <IconButton aria-label="Info" size="medium" className="bg-white">
            <InfoOutlined fontSize="inherit" className="bg-white rounded-full" />
          </IconButton>
        </Popover>
      </div>

      <div className="absolute right-0 z-[10000] bottom-[12vh] mr-[1rem] w-fit">
        <GradientScale toggle={toggle} />
      </div>
      <div className="absolute z-[10000] ml-[5rem] mt-[1rem]">
        <RankInfo toggle={toggle} onToggle={handleToggleLayer} time={time} />
      </div>
    </>
  );
};
export default RightOverlayLayer;
