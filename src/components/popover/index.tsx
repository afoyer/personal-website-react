import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface PopoverProps {
    /**
     * The element that triggers the popover.
     */
    children: React.ReactNode;
    /**
     * The content to display inside the popover.
     */
    content: React.ReactNode;
    /**
     * The interaction mode that triggers the popover.
     * @default 'hover'
     */
    trigger?: 'hover' | 'click';
    /**
     * Additional classes for the popover content container.
     */
    className?: string;
    /**
     * Preferred position of the popover relative to the trigger.
     * @default 'top'
     */
    position?: 'top' | 'bottom' | 'left' | 'right';
}

export function Popover({
    children,
    content,
    trigger = 'hover',
    className,
    position = 'top'
}: PopoverProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const toggle = () => setIsOpen(!isOpen);
    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (trigger === 'click' && isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [trigger, isOpen]);

    const handlers = trigger === 'hover'
        ? { onMouseEnter: open, onMouseLeave: close }
        : { onClick: toggle };

    const positionClasses = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    };

    return (
        <div
            ref={containerRef}
            className="relative inline-block"
            {...handlers}
        >
            <div className="cursor-pointer border-b border-dashed border-muted-foreground hover:border-foreground transition-colors">
                {children}
            </div>
            {isOpen && (
                <div
                    className={cn(
                        "absolute z-50 min-w-[200px] rounded-md border border-border bg-popover p-3 text-sm text-popover-foreground shadow-md outline-none",
                        "animate-in fade-in-0 zoom-in-95 duration-200",
                        positionClasses[position],
                        className
                    )}
                >
                    {content}
                </div>
            )}
        </div>
    );
}
