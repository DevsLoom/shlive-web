'use client';

import { Icon } from '@iconify/react';
import { Card, Text, Title } from '@mantine/core';

const Dashboard = () => {
  return (
    <div>
      <Title size="sm" mb="lg">
        Welcome, Ashraf Emon
      </Title>

      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
        <Card className="bg-red-200">
          <div className="flex flex-col gap-1">
            <Icon icon="clarity:users-line" fontSize={25} />

            <Title className="text-2xl">256</Title>
            <Text className="text-sm">Total Users</Text>
          </div>
        </Card>

        <Card className="bg-orange-200">
          <div className="flex flex-col gap-1">
            <Icon icon="cil:room" fontSize={25} />

            <Title className="text-2xl">256</Title>
            <Text className="text-sm">Rooms</Text>
          </div>
        </Card>

        <Card className="bg-green-200">
          <div className="flex flex-col gap-1">
            <Icon icon="mingcute:coin-2-line" fontSize={25} />

            <Title className="text-2xl">256</Title>
            <Text className="text-sm">Coin Packages</Text>
          </div>
        </Card>

        <Card className="bg-blue-200">
          <div className="flex flex-col gap-1">
            <Icon icon="pixelarticons:coin" fontSize={25} />

            <Title className="text-2xl">256</Title>
            <Text className="text-sm">Sells Coin</Text>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
