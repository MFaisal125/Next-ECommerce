// "use client";

// import React, { useEffect, useMemo } from "react";
// import Container from "../shared/Container";
// import Card from "../shared/Card";
// import { useGetProductsQuery } from "@/services/product/productApi";
// import ProductCard from "../shared/skeletonLoading/ProductCard";
// import { toast } from "react-hot-toast";

// const NewArrivals = () => {
//   const {
//     data: productsData,
//     error: productsError,
//     isLoading: productsLoading,
//   } = useGetProductsQuery();
//   const products = useMemo(() => productsData?.data || [], [productsData]);

//   useEffect(() => {
//     if (productsError) {
//       toast.error(productsError?.data?.description, {
//         id: "new-arrivals",
//       });
//     }
//   }, [productsError]);

//   return (
//     <Container>
//       <section className="flex flex-col gap-y-10">
//         <h1 className="text-4xl">New Arrivals</h1>

//         <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 md:gap-x-6 gap-y-8">
//           {productsLoading ? (
//             <>
//               {[1, 2, 3, 4].map((_, index) => (
//                 <ProductCard key={index} />
//               ))}
//             </>
//           ) : (
//             <>
//               {products?.slice(0, 3)?.map((product, index) => (
//                 <Card key={index} index={index} product={product} />
//               ))}
//             </>
//           )}
//         </div>
//         {!productsLoading && products?.length === 0 && (
//           <p className="text-sm">No products found</p>
//         )}
//       </section>
//     </Container>
//   );
// };

// export default NewArrivals;

"use client";

import { useEffect, useMemo, useState } from "react";
import Container from "../shared/Container";
import Card from "../shared/Card";
import { useGetProductsQuery } from "@/services/product/productApi";
import ProductCard from "../shared/skeletonLoading/ProductCard";
import { toast } from "react-hot-toast";

const NewArrivals = () => {
  const [visibleProducts, setVisibleProducts] = useState(4);

  const {
    data: productsData,
    error: productsError,
    isLoading: productsLoading,
  } = useGetProductsQuery();
  const products = useMemo(() => productsData?.data || [], [productsData]);

  useEffect(() => {
    if (productsError) {
      toast.error(productsError?.data?.description, {
        id: "new-arrivals",
      });
    }
  }, [productsError]);

  const handleShowMore = () => {
    setVisibleProducts((prev) => prev + 8);
  };

  const hasMoreProducts = !productsLoading && products.length > visibleProducts;

  return (
    <Container>
      <section className="flex flex-col gap-y-5">
        <h1 className="text-4xl">New Arrivals</h1>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 md:gap-x-4 gap-y-4">
          {productsLoading ? (
            <>
              {[1, 2, 3, 4].map((_, index) => (
                <ProductCard key={index} />
              ))}
            </>
          ) : (
            <>
              {products?.slice(0, visibleProducts)?.map((product, index) => (
                <Card key={index} index={index} product={product} />
              ))}
            </>
          )}
        </div>

        {!productsLoading && products?.length === 0 && (
          <p className="text-sm">No products found</p>
        )}

        {hasMoreProducts && (
          <div className="flex justify-center rounded-full mt-4">
            <span
              onClick={handleShowMore}
              className="px-6 rounded-full bg-cyan-400 py-2"
            >
              Show More
            </span>
          </div>
        )}
      </section>
    </Container>
  );
};

export default NewArrivals;
