"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, Users, Crown, Gem } from "lucide-react";
import { useState, useEffect } from "react";

import { cn } from "@/lib/utils";
import { useModalStore } from "@/store/useModalStore";
import { GameTypeEnum } from "@/types/lobby";
import { Input } from "@/components/ui/input";
import { Button } from "@/components";
import ItemCard from "@/components/itemCard";

// Constants
const DIALOG_STYLES = {
  container:
    "max-w-[560px] bg-[#09152A]/10 border border-[#0098EA] backdrop-blur-2xl rounded-2xl p-0",
  header: "border-b border-[#1A3150] px-6 py-5 relative",
  title: "text-2xl font-normal uppercase tracking-wide text-white text-center",
  content: "px-6 pb-6",
} as const;

const CLOSE_BUTTON_STYLES =
  "flex h-9 w-9 items-center justify-center absolute right-6 top-5 rounded-lg border border-red-900/50 bg-[#FF2428] text-white shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer";

const BET_OPTIONS = [0.5, 1, 3] as const;
const SINGLE_GAME_SLOTS = [1, 2, 3, 4] as const;

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-in data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  showCloseButton?: boolean;
}

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, children, showCloseButton = true, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg transition-opacity duration-300 ease-in data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground'>
          <X className='h-4 w-4' />
          <span className='sr-only'>Close</span>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

// Reusable Components
interface DialogHeaderWithCloseProps {
  title: string;
  onClose: () => void;
  className?: string;
}

const DialogHeaderWithClose = ({
  title,
  onClose,
  className,
}: DialogHeaderWithCloseProps) => (
  <DialogHeader className={cn(DIALOG_STYLES.header, className)}>
    <DialogTitle className={DIALOG_STYLES.title}>{title}</DialogTitle>
    <DialogPrimitive.Close onClick={onClose} className={CLOSE_BUTTON_STYLES}>
      <X size={20} strokeWidth={3} />
      <span className='sr-only'>Close</span>
    </DialogPrimitive.Close>
  </DialogHeader>
);

interface IconWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const IconWrapper = ({ children, className }: IconWrapperProps) => (
  <div
    className={cn(
      "flex h-5 w-5 items-center justify-center rounded-full shadow-sm",
      className
    )}
  >
    {children}
  </div>
);

const GemIcon = ({ size = 10 }: { size?: number }) => (
  <Gem size={size} className='text-white fill-white translate-y-[0.5px]' />
);

// Game Type Content Components
interface OnlineGameContentProps {
  selectedSlot: number | null;
  onSlotSelect: (slot: number) => void;
}

const OnlineGameContent = ({
  selectedSlot,
  onSlotSelect,
}: OnlineGameContentProps) => (
  <div className='flex flex-col items-center py-12'>
    <div className='flex gap-4 mb-10'>
      {BET_OPTIONS.map((amount) => (
        <button
          key={amount}
          onClick={() => onSlotSelect(amount)}
          className={cn(
            "relative flex h-[60px] min-w-[100px] items-center justify-center gap-3 rounded-xl border transition-all duration-200 px-4",
            selectedSlot === amount
              ? "border-[#0098EA] bg-[#1A3150] shadow-[0_0_15px_rgba(0,152,234,0.3)]"
              : "border-[#1A3150] bg-[#09152A]/40 hover:border-[#2a4a75] hover:bg-[#1A3150]/60"
          )}
        >
          <div className='flex h-6 w-6 items-center justify-center rounded-full bg-[#0098EA] shadow-sm'>
            <Gem
              size={12}
              className='text-white fill-white translate-y-[1px]'
            />
          </div>
          <span className='text-lg font-medium text-white'>{amount}</span>
        </button>
      ))}
    </div>
    <Button
      label='LAUNCH'
      icon={
        <IconWrapper className='bg-[#0098EA]'>
          <GemIcon size={10} />
        </IconWrapper>
      }
    />
  </div>
);

interface SingleGameContentProps {
  selectedSlot: number | null;
  onSlotSelect: (slot: number) => void;
}

const SingleGameContent = ({
  selectedSlot,
  onSlotSelect,
}: SingleGameContentProps) => (
  <div className='flex flex-col items-center py-12'>
    <div className='flex gap-4 mb-10'>
      {SINGLE_GAME_SLOTS.map((index) => (
        <button
          key={index}
          onClick={() => onSlotSelect(index)}
          className={cn(
            "group relative flex h-16 w-20 items-center justify-center rounded-xl border transition-all duration-200 cursor-pointer",
            selectedSlot === index
              ? "border-yellow-500 bg-[#1A3150] shadow-[0_0_15px_rgba(234,179,8,0.2)]"
              : "border-[#1A3150] bg-[#09152A]/40 hover:border-[#2a4a75] hover:bg-[#1A3150]/60"
          )}
        >
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-b from-yellow-400 to-yellow-600 shadow-sm",
              selectedSlot === index
                ? "scale-110"
                : "opacity-80 grayscale-[0.3] group-hover:grayscale-0"
            )}
          >
            <Crown size={14} className='text-white fill-white' />
          </div>
        </button>
      ))}
    </div>
    <Button
      label='CONTINUE'
      icon={
        <IconWrapper className='bg-gradient-to-b from-yellow-400 to-yellow-600'>
          <GemIcon size={10} />
        </IconWrapper>
      }
    />
  </div>
);

interface PrivateGameContentProps {
  amount: string;
  telegramId: string;
  onAmountChange: (value: string) => void;
  onTelegramIdChange: (value: string) => void;
}

const PrivateGameContent = ({
  amount,
  telegramId,
  onAmountChange,
  onTelegramIdChange,
}: PrivateGameContentProps) => (
  <div className='flex flex-col items-center py-12 gap-5'>
    <Input
      value={amount}
      onChange={(e) => onAmountChange(e.target.value)}
      onSubmit={() => null}
      placeholder='Enter amount of TON...'
      isLoading={false}
      buttonLabel='Continue'
      icon={
        <IconWrapper className='bg-[#0098EA]'>
          <GemIcon size={10} />
        </IconWrapper>
      }
    />
    <Input
      value={telegramId}
      onChange={(e) => {
        if (e.target.value !== "") {
          onTelegramIdChange(e.target.value);
        }
      }}
      onSubmit={() => null}
      placeholder='Enter Telegram ID...'
      isLoading={false}
      buttonLabel='Invite Friends'
      icon={
        <IconWrapper className='bg-[#0098EA]'>
          <Users
            size={10}
            className='text-white fill-white translate-y-[0.5px]'
          />
        </IconWrapper>
      }
    />
  </div>
);

// Game Dialog Component
interface GameDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GameDialog({ open, onOpenChange }: GameDialogProps) {
  const [selectedSlot, setSelectedSlot] = useState<number | null>(1);
  const [privateGame, setPrivateGame] = useState({
    amount: "",
    telegramId: "",
  });
  const gameType = useModalStore((state) => state.gameType);

  const dialogTitle = gameType ? GameTypeEnum[gameType] : "";

  const renderGameContent = () => {
    switch (gameType) {
      case GameTypeEnum.ONLINE:
        return (
          <OnlineGameContent
            selectedSlot={selectedSlot}
            onSlotSelect={setSelectedSlot}
          />
        );
      case GameTypeEnum.SINGLE:
        return (
          <SingleGameContent
            selectedSlot={selectedSlot}
            onSlotSelect={setSelectedSlot}
          />
        );
      case GameTypeEnum.PRIVATE:
        return (
          <PrivateGameContent
            amount={privateGame.amount}
            telegramId={privateGame.telegramId}
            onAmountChange={(value) =>
              setPrivateGame((prev) => ({ ...prev, amount: value }))
            }
            onTelegramIdChange={(value) =>
              setPrivateGame((prev) => ({ ...prev, telegramId: value }))
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(DIALOG_STYLES.container, "min-h-[400px]")}
        showCloseButton={false}
      >
        <DialogHeaderWithClose
          title={dialogTitle}
          onClose={() => onOpenChange(false)}
        />
        <div className={DIALOG_STYLES.content}>{renderGameContent()}</div>
      </DialogContent>
    </Dialog>
  );
}

// Confirm Purchase Dialog Component
interface ConfirmPurchaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ConfirmPurchaseDialog({
  open,
  onOpenChange,
}: ConfirmPurchaseDialogProps) {
  const openModal = useModalStore((state) => state.openModal);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={DIALOG_STYLES.container}
        showCloseButton={false}
      >
        <DialogHeaderWithClose
          title='CONFIRM PURCHASE'
          onClose={() => onOpenChange(false)}
        />
        <div className={DIALOG_STYLES.content}>
          <ItemCard
            className='max-h-50 mt-4 mx-auto'
            onClickHandle={() => openModal("confirm-purchase")}
          />
          <div className='flex gap-4 justify-center items-center mt-4 mb-5'>
            <Button label='CANCEL' onClick={() => onOpenChange(false)} />
            <Button label='PAY' />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Dialog Provider Component
export function DialogProvider() {
  const [isMounted, setIsMounted] = useState(false);
  const { isOpen, type, closeModal } = useModalStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const handleOpenChange = (open: boolean) => {
    if (!open) closeModal();
  };

  return (
    <>
      <GameDialog
        open={isOpen && type === "game"}
        onOpenChange={handleOpenChange}
      />
      <ConfirmPurchaseDialog
        open={isOpen && type === "confirm-purchase"}
        onOpenChange={handleOpenChange}
      />
    </>
  );
}

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
