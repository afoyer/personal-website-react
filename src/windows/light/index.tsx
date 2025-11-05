import DraggableWindow, {
  DraggableWindowProps,
} from "../../components/draggable-window";

function LightWindow(
  props: DraggableWindowProps & {
    originPosition?: { x: number; y: number } | null;
  }
) {
  return (
    <DraggableWindow
      {...props}
      title="Light"
      id="light-window"
      initial={{
        opacity: 0,
        scale: props.originPosition ? 0 : 1,
      }}
    >
      <LightWindowContent />
    </DraggableWindow>
  );
}

function LightWindowContent() {
  return (
    <div>
      <h1>Amazon</h1>
    </div>
  );
}

export default LightWindow;
