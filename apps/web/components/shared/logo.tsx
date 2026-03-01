import logoIcon from "@/assets/logo-icon.svg";
import { cn } from "@workspace/ui/lib/utils";
import Image from "next/image";

interface Props {
  className?: string;
}

export const Logo = ({ className }: Props) => {
  return (
    <div className="flex gap-x-2">
      <Image src={logoIcon} alt="Logo icon" />
      <p
        className={cn(
          "font-red-hat text-[24px] font-bold text-black",
          className,
        )}
      >
        QuickHire
      </p>
    </div>
  );
};
