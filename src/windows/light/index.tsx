import DraggableWindow, {
  DraggableWindowProps,
} from "../../components/draggable-window";
import LightSvg from "./svg";

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
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <LightSvg />
      </div>
    </>
  );
}

export default LightWindow;
