import { useQuery } from "@tanstack/react-query";
import DraggableWindow, {
  DraggableWindowProps,
} from "../../components/draggable-window";
import { getUrl } from "aws-amplify/storage";
import Spinner from "../../components/spinner";
import { useState } from "react";

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
      initial={{
        opacity: 0,
        scale: props.originPosition ? 0 : 1,
      }}
    >
      <ResumeContent />
    </DraggableWindow>
  );
}

function ResumeContent() {
  const [iframeLoaded, setIframeLoaded] = useState(false);

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
    return (
      <div style={{ width: "100%", height: "100%", position: "relative" }}>
        {!iframeLoaded && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Spinner />
          </div>
        )}
        <iframe
          src={resumeUrl + "#toolbar=0"}
          width="100%"
          height="100%"
          onLoad={() => setIframeLoaded(true)}
          style={{
            opacity: iframeLoaded ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
            border: "none",
          }}
        />
      </div>
    );
  }
}

export default Resume;
