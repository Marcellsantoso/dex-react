interface ActionButtonParams {
    text: string;
    onClick: ActionButtonCallback;
}

type ActionButtonCallback = () => any;

function ActionButton({ text, onClick }: ActionButtonParams) {
    return (
        <button className="flex w-full bg-blue-500/20 hover:bg-blue-500/25 justify-center py-3 rounded-xl" onClick={onClick}>
            <div className="text-blue-400">{text}</div>
        </button>
    );
}

export default ActionButton;