import React from "react";
import { Link } from "react-router-dom";

export const ProductCard = ({ product }) => {
  return (
    <>
<div class="box">
                <Link to={"/product/" + product._id}>
                  <div class="img-box">
                    <img src={
              product && product?.productPicture[0]?.url
            }
            alt={product.title} />
                  </div>
                  <div class="detail-box">
                    <h6>
                    {product.title}
                    </h6>
                    <h6>
                      Price
                      <span>
                        ${product.price}
                      </span>
                    </h6>
                  </div>
                  {/* <div class="new">
                    <span>
                      New
                    </span>
                  </div> */}
                </Link>
              </div>
    </>
  );
};
