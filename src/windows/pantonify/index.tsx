import DraggableWindow, {
  DraggableWindowProps,
} from "../../components/draggable-window";

function PantonifyWindow(
  props: DraggableWindowProps & {
    originPosition?: { x: number; y: number } | null;
  }
) {
  // Fetch resume from Amplify Storage using React Query
  // Assumes `Storage` from aws-amplify is available in the global import scope
  // and react-query's `useQuery` is available in global import scope.

  return (
    <DraggableWindow
      {...props}
      title="Pantonify"
      id="pantonify-window"
      initial={{
        opacity: 0,
        scale: props.originPosition ? 0 : 1,
      }}
    >
      <PantonifyWindowContent />
    </DraggableWindow>
  );
}

function PantonifyWindowContent() {
  return (
    <div>
      <h1>Amazon</h1>
    </div>
  );
}

export default PantonifyWindow;
