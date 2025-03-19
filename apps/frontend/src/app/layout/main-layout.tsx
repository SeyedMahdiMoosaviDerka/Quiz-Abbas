import { Outlet } from 'react-router';
import PickAWinHeader from '../../components/PickAWinHeader';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-background">
      <div className="w-full max-w-screen-lg mx-auto mb-[50px]">
        <PickAWinHeader title="Pick 4 Win" />
        <Outlet />
      </div>

      <div className="fixed z-50 bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm py-2 sm:py-3 px-2 sm:px-4">
        <div className="max-w-screen-lg mx-auto flex items-center justify-center">
          <div className="text-xs text-white/80 rounded-full px-3 py-1 transition-colors">
            Sports Event Quiz Task
          </div>
        </div>
      </div>
    </div>
  );
}
