import { useNavigate } from 'react-router-dom';

export function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6">
      <button
        className="px-6 py-3 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
        onClick={() => navigate('/study/ol')}
      >
        සාමන්‍ය පෙළ
      </button>
      <button
        className="px-6 py-3 bg-green-600 text-white rounded shadow hover:bg-green-700"
        onClick={() => navigate('/study/al')}
      >
        උසස් පෙළ
      </button>
    </div>
  );
}
