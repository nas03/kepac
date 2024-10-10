import os
import glob
from osgeo import gdal
import numpy as np
import datetime
import pandas as pd

# import shapefile

# folde chua anh input
folder_pm25_path = r'/Users/anhson/Documents/Projects/kepac/server/assets/geotiff'

folder_csv_path = r'/Users/anhson/Documents/Projects/kepac/server/assets/csv'  # folder output
folder_json_path = r'/Users/anhson/Documents/Projects/kepac/server/assets/json'

meta_path = r'/Users/anhson/Documents/Projects/kepac/server/tmp/data/districtsVN.xlsx'
meta = pd.read_excel(meta_path)

dist_path = r'/Users/anhson/Documents/Projects/kepac/server/tmp/data/VN_districts_100m.tif'
dist_ds = gdal.Open(dist_path, gdal.GA_ReadOnly)
dist = dist_ds.ReadAsArray()  # nodata 65535

ulx, xres, xskew, uly, yskew, yres = dist_ds.GetGeoTransform()
lrx = ulx + (dist_ds.RasterXSize * xres)
lry = uly + (dist_ds.RasterYSize * yres)

year = '2020'
year_log = []

for filepath in glob.iglob(os.path.join(folder_pm25_path, '*.tif')):
    print(filepath)
    _, filename = os.path.split(filepath)

    year = filename.split('_')[1][0:4]
    month = filename.split('_')[1][4:6]
    day = filename.split('_')[1][6:8]
    hour = filename.split('_')[1][8:10]
    minute = filename.split('_')[1][10:12]
    second = filename.split('_')[1][12:14]
    timeInfo = datetime.datetime(int(year), int(month), int(
        day), int(hour), int(minute), int(second))

    temp_fpath = 'temp.tif'

    gdal.Warp(
        temp_fpath,
        filepath,
        format="GTiff",
        dstSRS="+proj=utm +zone=48 +datum=WGS84 +units=m +no_defs",
        xRes=100, yRes=-100,
        outputBounds=(ulx, lry, lrx, uly),
        resampleAlg="near",
        creationOptions=['COMPRESS=LZW'],
    )

    data = gdal.Open(temp_fpath, gdal.GA_ReadOnly).ReadAsArray()
    # print(data)
    rows, cols = data.shape

    new_data = np.reshape(data, rows*cols)
    new_dist = np.reshape(dist, rows*cols)

    mask = (new_data != -9999) & (new_dist != 65535)

    new_data = new_data[mask]
    new_dist = new_dist[mask]

    df = pd.DataFrame({'dist_ID': new_dist, 'Precipitation': new_data})
    df = df.groupby('dist_ID', as_index=False).mean()
    df['time'] = timeInfo
    df = df[['time', 'dist_ID', 'Precipitation']]

    # print(meta)
    sub_meta = meta[['ID', 'GID_2', 'VARNAME_2', 'ENGTYPE_2']]
    sub_meta.columns = ['dist_ID', 'GID_2', 'VARNAME_2', 'ENGTYPE_2']
    df = pd.merge(df, sub_meta)
    df = df.rename(columns={
        'dist_ID': 'district_id',
        'Precipitation': 'avg_precipitation',
        'GID_2': 'geo_id',
        'VARNAME_2': 'district_name',
        'ENGTYPE_2': 'geo_type',
        'time': 'time'
    })
    year_log.append(df)

    os.remove(temp_fpath)

    # break
year_df = pd.concat(year_log)
year_df.to_csv(folder_csv_path + f'/data.csv', index=False)

6