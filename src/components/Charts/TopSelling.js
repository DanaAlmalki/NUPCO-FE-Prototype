import React from "react";

export default function TopSelling({ topProducts }) {
  return (
    <div>
      {topProducts.map((product) => (
        <div
          key={product._id}
          className="flex gap-x-[1rem] border-b-[3px] p-[0.5rem]"
        >
          <div className="w-[1rem] bg-black p-[0.5rem]"></div>
          <div className="flex gap-x-[1rem] justify-between p-[0.5rem] text-sm">
            <span>
              <div className="text-ellipsis">{product.productName}</div>
              <div>${product.revenue / product.totalSold}</div>
            </span>
            <span>
              <div>{product.totalSold}</div>
              <div>sales</div>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
