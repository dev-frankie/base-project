"use client";

import { useEffect } from "react";
import { useAuthProcessStore } from "../../model/store";

/**
 * 인증 프로세스 컴포넌트 예제
 *
 * 이 컴포넌트는 여러 features를 순차적으로 조합하여
 * 완전한 인증 워크플로우를 제공합니다:
 *
 * 1. Login (features/login)
 * 2. Register (features/register) - 필요시
 * 3. Email Verification (features/email-verification)
 * 4. Complete
 */
export const AuthProcess = () => {
  const { step, setStep } = useAuthProcessStore();

  useEffect(() => {
    // 프로세스 단계에 따른 로직
    // 실제로는 features/login, features/register 등을 조합

    console.log("Auth Process Step:", step);
  }, [step]);

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600">
        현재 단계: <strong>{step}</strong>
      </div>

      {/* 
        실제 구현에서는:
        - step === 'login' && <LoginForm />
        - step === 'register' && <RegisterForm />
        - step === 'verification' && <EmailVerificationForm />
      */}

      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-700">이 프로세스는 여러 features를 조합합니다:</p>
        <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
          <li>features/login</li>
          <li>features/register</li>
          <li>features/email-verification</li>
        </ul>
      </div>

      {/* 예제: 단계 변경 버튼 */}
      <div className="flex gap-2">
        <button
          onClick={() => setStep("login")}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          로그인
        </button>
        <button
          onClick={() => setStep("register")}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          회원가입
        </button>
        <button
          onClick={() => setStep("verification")}
          className="px-4 py-2 bg-purple-500 text-white rounded"
        >
          인증
        </button>
      </div>
    </div>
  );
};
