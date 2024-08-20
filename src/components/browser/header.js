import { Button } from '@/components/ui/button';
import { Heading } from '@carbon/react';
import { Search } from '@carbon/icons-react';
const Header = () => {
  return (
    <div className="w-full h-15 flex justify-between items-center mb-4 mt-[-1rem]">
      <Heading className="text-[28px] font-medium">MQTT Explorer</Heading>
      <Button className="rounded-[3px] hover:bg-[#acaeb1]" variant="ghost">
        <Search className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default Header;
