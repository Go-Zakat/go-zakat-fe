interface DividerProps {
    text?: string;
}

export const Divider = ({ text }: DividerProps) => {
    return (
        <div className="relative">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
            </div>
            {text && (
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-dark-paper text-gray-600 dark:text-gray-400">{text}</span>
                </div>
            )}
        </div>
    );
};
