import { useQuery } from "@tanstack/react-query";
import DraggableWindow, {
  DraggableWindowProps,
} from "../../components/draggable-window";
import { getUrl } from "aws-amplify/storage";
import Spinner from "../../components/spinner";

function Resume(
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
      title="Resume"
      id="resume-window"
      variant="fullscreen"
      initial={{
        opacity: 0,
        scale: props.originPosition ? 0 : 1,
      }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
    >
      <ResumeContent />
    </DraggableWindow>
  );
}

function ResumeContent() {
  const {
    data: resumeUrl,
    isLoading: loadingResume,
    error: resumeError,
  } = useQuery({
    queryKey: ["resumeUrl"],
    queryFn: async () => {
      const result = await getUrl({
        path: "resume/resume.pdf",
      });
      return result.url.toString();
    },
  });
  if (loadingResume) {
    return <Spinner />;
  } else if (resumeError) {
    return <div>Error loading resume {resumeError.message}</div>;
  } else {
    return <iframe src={resumeUrl + "#toolbar=0"} width="100%" height="100%" />;
  }
  return (
    <div>
      <h1>Projects</h1>
    </div>
  );
}

export default Resume;
