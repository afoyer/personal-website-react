import { useQuery } from "@tanstack/react-query";
import DraggableWindow, {
  DraggableWindowProps,
} from "../../components/draggable-window";
import { getUrl } from "aws-amplify/storage";
import Spinner from "../../components/spinner";
import { useState } from "react";
import { DownloadIcon } from "lucide-react";

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
            pointerEvents: "none", // Prevent iframe from capturing mouse events during resize/hover or resizing
            opacity: iframeLoaded ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
            border: "none",
            position: "absolute",
            top: 0,
            left: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.pointerEvents = "auto";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.pointerEvents = "none";
          }}
        />
        <a
          href={resumeUrl}
          download
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: "absolute",
            bottom: 16,
            right: 16,
            background: "rgba(255,255,255,0.85)",
            borderRadius: 6,
            padding: "8px 14px",
            textDecoration: "none",
            color: "#222",
            fontWeight: 500,
            boxShadow: "0 2px 8px rgba(0,0,0,0.13)",
            zIndex: 10,
            fontSize: 14,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
          tabIndex={0}
          aria-label="Download resume PDF"
        >
          <DownloadIcon />
        </a>
      </div>
    );
  }
}

export default Resume;
