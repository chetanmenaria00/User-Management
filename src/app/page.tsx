import ButtonWithAnimation from '@/components/ButtonWithAnimation';
import LightEffect from '@/components/LightAnimation';
import TextWithAnimation from '@/components/TextWithAnimation';

export default function Home() {
  return (
    <div
      className="h-screen flex justify-center items-center gap-4 flex-col relative"
      style={{
        overflow: 'hidden',
      }}
    >
      <LightEffect />
      <TextWithAnimation text={'Welcome, buckle up!'} />
      <ButtonWithAnimation text={'Explore'} />
    </div>
  );
}
