import { Divider } from "antd";
const InfoTip = () => {
  return (
    <>
      <div className="w-[20rem] text-xs">
        <h2 className="font-bold">Dữ liệu cảnh báo là gì?</h2>
        <p className="text-slate-800">
          Là dữ liệu dạng bản đồ cảnh báo trên khu vực Bắc Trung Bộ Việt Nam.
          Màu của khu vực tương ứng với dự báo về mức độ mưa trên khu vực theo
          các giá trị:
          <br /> - Mưa nhỏ <br />
          - Mưa vừa <br />
          - Mưa to <br />- Mưa rất to
        </p>
        <Divider />
        <h2 className="font-bold">Dữ liệu vệ tinh là gì?</h2>
        <p className="text-slate-800">
          Là dữ liệu dạng bản đồ mưa trên khu vực Bắc Trung Bộ Việt Nam. Mỗi
          điểm ảnh chứa giá trị lượng mưa đại diện cho một vùng không gian có
          phạm vi ~ 4x4 km. Các giá trị bản đồ được cập nhật theo giờ.
        </p>
      </div>
    </>
  );
};

export default InfoTip;
