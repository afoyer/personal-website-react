import { motion } from "motion/react";
import DraggableWindow, {
  DraggableWindowProps,
} from "../../components/draggable-window";
import CloudscapeContainer from "./cloudscape-container";
import "./index.css";
import { Suspense } from "react";
import ImageFetcher from "../../components/image-fetcher";
import Spinner from "../../components/spinner";
import {
  ArrowUpDown,
  Atom,
  Code,
  Database,
  FunctionSquare,
  Server,
} from "lucide-react";

function AmazonWindow(
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
      title="Amazon"
      id="amazon-window"
      initial={{
        opacity: 0,
        scale: props.originPosition ? 0 : 1,
      }}
      className="bg-white dark:bg-neutral-800 container"
    >
      <AmazonWindowContent />
    </DraggableWindow>
  );
}

function AmazonWindowContent() {
  return (
    <div className=" space-y-4 mx-2 sm:mx-8 pb-20 sm:pb-6">
      <motion.h1
        className="cloudscape-page-header py-4 text-center sm:text-left sm:pl-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        Amazon
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
      >
        <CloudscapeContainer header="Role">
          <p className="mb-4">
            I am a front end engineer working as part of{" "}
            <a
              href="https://aws.amazon.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-600"
            >
              AWS
            </a>{" "}
            on the Data Center Automation team as part of InfraMap. A
            topological view of data center monitoring at a global scale.
          </p>
        </CloudscapeContainer>
      </motion.div>
      <motion.div
        className="flex flex-wrap gap-4 items-stretch justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
      >
        <CloudscapeContainer
          header="Optimization"
          className="grow shrink basis-xs"
        >
          <p className="mb-4">
            Reduced up to 80% of code used per page by creating a shared library
            of design patterns between two applications to streamline logic
            while accommodating for uniqueness between both applications.
          </p>
          <p className="mb-4">
            This allowed for a standardized approach to building new pages,
            while also allowing for customizations to be made for each
            application.
          </p>
        </CloudscapeContainer>
        <CloudscapeContainer header="Scale" className="grow shrink basis-xs">
          <p>
            Coordinated with sister and support teams to launch and configure
            monitoring for 50+ data centers
          </p>
        </CloudscapeContainer>
      </motion.div>
      <motion.h1
        className="cloudscape-page-header py-4 text-center sm:text-left sm:pl-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        MetricOrganizer
      </motion.h1>
      <motion.div className="flex flex-wrap gap-4 items-stretch justify-center">
        <motion.div
          className="grow shrink basis-xs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
        >
          <div className="flex flex-col gap-4">
            <CloudscapeContainer header="What is it?">
              <p className="mb-4">
                MetricOrganizer (a.k.a. MO) is a framework that programmatically
                manages and lays out metrics based on a conafiguration, allowing
                non-technical users to generate their own pages while we handle
                the backend fetching and resolving of a defined metric on a data
                center level scale.
              </p>
              <p className="mb-4">
                This solution was built to address two main problems:
                <ul className="pt-2 pl-4 list-disc list-inside">
                  <li>
                    Our database services had no relational knowledge of what
                    metric had to do with a given context
                  </li>
                  <li>
                    Data centers are often unique in their own way which meant
                    having to build bespoke pages for each one
                  </li>
                </ul>
                <p className="mt-4">
                  On top of this, this solution had to be functional across
                  different applications and uses, with extensibility for future
                  metrics and types of metric fetching.
                </p>
              </p>
            </CloudscapeContainer>
            <CloudscapeContainer>
              <p>
                This solution is built on top a grid layout system that extends
                further than just metrics. This allows us to place graphics as
                well as more logical layout containers and tabs to keep track of
                a data center's status.
              </p>
              <p className="mt-4">
                On top of this, this layout system allows for dynamic loading
                through simple rendering techniques thanks to React.
              </p>
            </CloudscapeContainer>
          </div>
        </motion.div>
        <motion.div className="grow shrink basis-xs sticky top-1 self-start">
          <CloudscapeContainer>
            <Suspense fallback={<Spinner />}>
              <ImageFetcher
                folder="amazon"
                fileName="example.PNG"
                className="rounded-md shadow-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                alt="Example of MetricOrganizer"
                description={
                  <div>
                    <p>Example of MetricOrganizer.</p>
                    <p>
                      This shows the concept of{" "}
                      <i>
                        "How do we know that SystemMode should be in this
                        specific location?"
                      </i>
                    </p>{" "}
                  </div>
                }
              />
            </Suspense>
          </CloudscapeContainer>
        </motion.div>
      </motion.div>
      <CloudscapeContainer header="Extensibility">
        <p className="mb-4">
          On top of thinking about what features we wanted to support for the
          end user to have access to, I had to think about how a developer down
          the road would have to extend this framework for any unknown feature
          when this was created.
        </p>
        <p className="mb-4">
          This led to abstracting the definition of a point to how it is
          fetched, allowing us to key on what kind of fetching a point would
          need beforehand then making a large GraphQL query to fetch all the
          metrics with their specific needs.
        </p>
        <div className="flex justify-center flex-wrap items-center gap-8">
          <div className="flex justify-center items-center flex-col gap-4 grow shrink basis-[200px]">
            <Suspense fallback={<Spinner />}>
              <ImageFetcher
                suspense
                folder="amazon"
                fileName="json.png"
                className="rounded-md shadow-2xl "
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                whileHover={{ scale: 1.05 }}
                alt="Example of MetricOrganizer"
                description={
                  <div>
                    <p>Example of the JSON structure of a point.</p>
                  </div>
                }
              />
            </Suspense>
          </div>
          <div className="flex justify-center items-center flex-col gap-4 grow shrink basis-[200px]">
            <Suspense fallback={<Spinner />}>
              <ImageFetcher
                suspense
                folder="amazon"
                fileName="brainstorming.jpg"
                className="rounded-md shadow-2xl "
                animate={{ opacity: 1, rotate: 5 }}
                initial={{ opacity: 0, rotate: 5 }}
                whileHover={{ scale: 1.5, rotate: [5, 0] }}
                transition={{ duration: 1, ease: "anticipate" }}
                alt="Brainstorming session for MetricOrganizer"
                description={
                  <div>
                    <p>Brainstorming session for MetricOrganizer.</p>
                  </div>
                }
              />
            </Suspense>
          </div>
        </div>
      </CloudscapeContainer>
      <CloudscapeContainer header="Tooling">
        <p className="mb-4">
          Another section that we had to expand to enhance user experience (UX)
          was the ability to edit these configurations without the need to
          understand how the configuration files functioned. This lead to a
          large prototyping phase to understand flows and how to implement them.
        </p>
        <div className="flex justify-center flex-wrap items-center gap-4">
          <Suspense fallback={<Spinner />}>
            <ImageFetcher
              folder="amazon"
              fileName="editing.jpg"
              className="rounded-md shadow-2xl max-w-1/2  grow shrink basis-[100px] min-w-[200px]"
              alt="Prototype of MetricOrganizer"
            />
          </Suspense>
          <p className="text-center text-sm grow shrink basis-[200px] min-w-[200px]">
            Prototype of the MetricOrganizer configuration editor. This added
            functionality to auto suggest metrics, guardrailing potential
            errors, and making the editing process smoother.
          </p>
        </div>
      </CloudscapeContainer>
      <CloudscapeContainer header="Technologies">
        <p className="mb-4">
          This solution was built using the following tools:
        </p>
        <ul className="pt-2 pl-4 list-disc list-inside">
          <li>
            React <Atom className="inline-block align-middle" />
          </li>
          <li>
            GraphQL <ArrowUpDown className="inline-block align-middle" />
          </li>
          <li>
            TypeScript <Code className="inline-block align-middle" />
          </li>
          <li>
            Lambda <FunctionSquare className="inline-block align-middle" />
          </li>
          <li>
            S3 <Database className="inline-block align-middle" />
          </li>
          <li>
            Redis <Server className="inline-block align-middle" />
          </li>
        </ul>
      </CloudscapeContainer>
    </div>
  );
}

export default AmazonWindow;
