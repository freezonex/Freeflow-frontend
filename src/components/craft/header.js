import { Button } from '@/components/ui/button';
import { Heading } from '@carbon/react';

const Header = ({ openCode }) => {
  return (
    <div className="w-full h-15 flex justify-between items-center mb-8">
      <Heading className="text-[28px] font-medium">Frontend Generation</Heading>
      <div className="flex gap-x-2">
        <Button
          className="w-[150px] px-6 py-1 rounded-[3px] space-x-1 bg-[#C7F564] font-semibold hover:bg-[#8bbc02]"
          variant={'default'}
          onClick={openCode}
        >
          Deploy
        </Button>
      </div>
    </div>
  );
};

export default Header;
