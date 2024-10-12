
import os
import glob
from osgeo import gdal
import numpy as np
import datetime
import pandas as pd
# import shapefile

# input path
folder_geotiff_path = r'assets/geotiff'
# output path
folder_csv_path = r'assets/csv'

meta_path = r'scripts/data/districtsVN.xlsx'
meta = pd.read_excel(meta_path)

dist_path = r'scripts/data/VN_districts_100m.tif'
dist_ds = gdal.Open(dist_path, gdal.GA_ReadOnly)
dist = dist_ds.ReadAsArray()  # nodata 65535

ulx, xres, xskew, uly, yskew, yres = dist_ds.GetGeoTransform()
lrx = ulx + (dist_ds.RasterXSize * xres)
lry = uly + (dist_ds.RasterYSize * yres)

year = '2020'
year_log = []

for filepath in glob.iglob(os.path.join(folder_geotiff_path, '*.tif')):
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

    filenameNoExt = filename.split('.')[0]
    temp_fpath = f'assets/highRes/{filenameNoExt}.tif'

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
