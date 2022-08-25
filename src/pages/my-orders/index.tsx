import React, { useState } from "react";

import { Header, Icon, OrderCard, OrderCardItem } from "@components";

const MyOrders = () => {
  return (
    <div className="h-full">
      <Header animated showMenu backgroundColor="split" />
      <div className="h-screen bg_split pt-2 pl-8 pr-8 text-white overflow-y-auto overflow-x-auto">
        <div className="flex items-center">
          <div className="text-3xl font-thin mt-2">My orders</div>
          <Icon icon="las la-truck-loading" className="ml-3 text-4xl" />
        </div>
        <div className="pt-6">
          <OrderCard className="flex space-y-4">
            <OrderCardItem />
            <OrderCardItem />
          </OrderCard>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
