import DashboardLayout from '@/components/layout/DashboardLayout';
import DashboardAI from '@/components/ai/DashboardAI';

export default function AIPage() {
  return (
    <DashboardLayout>
      <main className="min-h-screen bg-blue-50/40 dir-rtl">
        <DashboardAI />
      </main>
    </DashboardLayout>
  );
}