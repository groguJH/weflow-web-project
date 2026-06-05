'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Alert, Button, Card, Form, Input } from 'antd';

export default function AdminLoginForm() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleFinish(values) {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || '로그인에 실패했습니다.');
        return;
      }

      router.replace(data.redirectTo || '/admin/dashboard');
      router.refresh();
    } catch {
      setError('로그인 요청 중 문제가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="mx-auto w-full max-w-md border-white/[0.08] shadow-2xl shadow-black/40">
      <div className="mb-8 text-center">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-blue-400">
          Admin
        </p>
        <h1 className="text-keep text-2xl font-black text-white">관리자 로그인</h1>
        <p className="text-keep mt-3 text-sm leading-relaxed text-slate-400">
          예약과 문의 상태를 관리하는 임시 관리자 페이지입니다.
        </p>
      </div>

      {error && (
        <Alert
          type="error"
          showIcon
          title={error}
          className="mb-5"
        />
      )}

      <Form
        layout="vertical"
        requiredMark={false}
        initialValues={{ username: 'admin', password: 'weflow1234' }}
        onFinish={handleFinish}
      >
        <Form.Item
          label="아이디"
          name="username"
          rules={[{ required: true, message: '아이디를 입력해 주세요.' }]}
        >
          <Input autoComplete="username" placeholder="admin" />
        </Form.Item>

        <Form.Item
          label="비밀번호"
          name="password"
          rules={[{ required: true, message: '비밀번호를 입력해 주세요.' }]}
        >
          <Input.Password autoComplete="current-password" placeholder="weflow1234" />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          block
          size="large"
        >
          대시보드로 이동
        </Button>
      </Form>

      <p className="text-keep mt-5 rounded-xl border border-white/[0.08] bg-slate-950/40 px-4 py-3 text-xs leading-relaxed text-slate-400">
        임시 계정: <span className="text-slate-200">admin / weflow1234</span>
      </p>
    </Card>
  );
}
