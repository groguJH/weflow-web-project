'use client';

import { ConfigProvider, theme } from 'antd';

export default function AdminAntdProvider({ children }) {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#2563eb',
          colorBgContainer: '#0f172a',
          colorBorder: 'rgba(255,255,255,0.08)',
          borderRadius: 12,
          fontFamily: 'inherit',
        },
        components: {
          Table: {
            headerBg: '#111827',
            rowHoverBg: 'rgba(37,99,235,0.12)',
          },
          Card: {
            colorBgContainer: 'rgba(15,23,42,0.72)',
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
