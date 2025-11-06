import { motion } from "motion/react";
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
      className="bg-gradient-to-b from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 text-gray-800 dark:text-gray-100"
    >
      <PantonifyWindowContent />
    </DraggableWindow>
  );
}

function PantonifyWindowContent() {
  return (
    <div className="mx-8 flex flex-col gap-4 pb-[25%]">
      <motion.h1
        className="text-2xl font-bold mb-4 flex justify-center items-center py-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.5 }}
      >
        Pantonify
      </motion.h1>
      <motion.div
        className="flex flex-col gap-2   mx-auto"
        whileInView={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <motion.p>
          Pantonify came from a similar website called{" "}
          <a
            href="https://receiptify.herokuapp.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600"
          >
            Receiptify
          </a>{" "}
          that allows you to view your top songs in the look of a receipt. I
          wanted to create a similar website for my own use, but with a
          different twist.
        </motion.p>
        <motion.p>
          After stumbling upon a{" "}
          <a
            href="https://www.youtube.com/watch?v=JF8UziDHqZo"
            target="_blank"
            className="text-blue-500 hover:text-blue-600"
            rel="noopener noreferrer"
          >
            Linus Tech Tips video
          </a>{" "}
          about the Pantone color swatch book they just bought to showcase (and
          the exhorbitant price that came with it), I realized I could create
          something that mimics the swatch card look.
        </motion.p>
        <motion.p>
          Starting off with an initial design through Figma, I knew two main
          things: I needed the make this site simple and I needed for it to be
          responsive. On top of that, I needed a way for users to save their
          favorite swatches created by them.
        </motion.p>
      </motion.div>
      <motion.div
        className="flex justify-center items-center flex-col gap-0"
        whileInView={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <motion.div className="relative flex justify-center items-center h-96">
          <motion.img
            src="https://amplify-d1wnt1ko8dcea-mai-afportfoliostoragebucket-s409muduvmpp.s3.us-east-1.amazonaws.com/pantonify/early.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZOMHIOACM4X3KHIH%2F20251106%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20251106T204925Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQCDZI%2BTT%2BdXwsSj9Oma4SFiprPfCi4l6ryDRHW67VPs1AIgcmPdwN85%2Fq0Weos0bB4Z1i1F6TBSuvduFHqw5B2cqgEq5gIIrv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARADGgw2NDkzNjA2MDEwOTIiDBWjQeHO0Ta%2Bk9FSwyq6AoSyBpTaa4nX%2BwX%2B41fx7xnCsG77QNL6r5GKRmuB8T53E11I%2Fa%2BOhHs7fEixgn76AFW5N1M0OfTn85Mq9YaHt%2B%2FqYj5llbIO3EijORjs9TK7Ko41U8xgj%2BConHOIPuZtdJ9tTDhG46ikhGW%2F80e6iV%2FC4e0BvsfodNucT5kNukGaNhuz94UlM0Xszrf3rHwukHEZ6CqQusOrgrTMOKhnD8K6wXbKAijb41gDtP8KY8%2Frdwga1wZC5KL%2BoDS2t7TcTZhEnTuElUfS4iQp9hcPP5C9XnvgNTaueJb8qNDueh2%2Bj1CVBenku1d152z9nFYDnCLlXbfgCxHOOzBuHBBYSKZYN9oaXycB8a%2FxFzXWhNCu%2ByDG0zGKnN%2F9HJBXF8Vpy46ehlmjXlpzCpBTaSCIrl%2BKZw2%2BE5neRcFVMPG5s8gGOq0CFB0IzSYSfIoPkXR30stgS%2FWC2jfValV%2BDggD3dSbaTS9REFnn0MeEym7ZL4sUa72mFcsfFXxXDt3gsReO6IaNmHwHZVdgboYu1XGajzij59qvzpsEdDWAaKbt5L1%2FjSZGeA1xp5iTDmA9q6StAfD95Zj76sQqH%2BL10RIER%2BxzEzUv52UXJt2Ucj0GdnRdzaeFThvLxCSEnes7wzrcuWEn57%2Fggg2N7jqa6846ma%2F7bVENr5eWhTk9XhEqCarN61DJCCrdX9leTm511oeqXx4YLGHFcltK%2FWw%2FCMbwFHPJEVaQ6rZBu6%2FYbcvqqKBYMTqOC2iI0K8aQOWg%2BJICn70L31SFZ0YxJp%2BVk7D%2B1d%2BnRbOIyLVtpOGT86Ba%2B4JhikQrJAMcMZYiBe69uoZ%2Fw%3D%3D&X-Amz-Signature=d86c662af9d835c5337977c8d4b01d1b59cb485d16c6d783951fd925daa49a92&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject"
            alt="Pantonify splash screen"
            loading="lazy"
            className="absolute w-full h-full object-contain px-8 pt-4 pb-1 max-w-2xl shadow-2xl rounded-lg"
            style={{ zIndex: 1 }}
            initial={{ rotate: -8, x: -20 }}
            animate={{ rotate: -8, x: -20 }}
            whileHover={{ rotate: -5, x: -15, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
          <motion.img
            src="https://amplify-d1wnt1ko8dcea-mai-afportfoliostoragebucket-s409muduvmpp.s3.us-east-1.amazonaws.com/pantonify/early.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZOMHIOACM4X3KHIH%2F20251106%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20251106T204925Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQCDZI%2BTT%2BdXwsSj9Oma4SFiprPfCi4l6ryDRHW67VPs1AIgcmPdwN85%2Fq0Weos0bB4Z1i1F6TBSuvduFHqw5B2cqgEq5gIIrv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARADGgw2NDkzNjA2MDEwOTIiDBWjQeHO0Ta%2Bk9FSwyq6AoSyBpTaa4nX%2BwX%2B41fx7xnCsG77QNL6r5GKRmuB8T53E11I%2Fa%2BOhHs7fEixgn76AFW5N1M0OfTn85Mq9YaHt%2B%2FqYj5llbIO3EijORjs9TK7Ko41U8xgj%2BConHOIPuZtdJ9tTDhG46ikhGW%2F80e6iV%2FC4e0BvsfodNucT5kNukGaNhuz94UlM0Xszrf3rHwukHEZ6CqQusOrgrTMOKhnD8K6wXbKAijb41gDtP8KY8%2Frdwga1wZC5KL%2BoDS2t7TcTZhEnTuElUfS4iQp9hcPP5C9XnvgNTaueJb8qNDueh2%2Bj1CVBenku1d152z9nFYDnCLlXbfgCxHOOzBuHBBYSKZYN9oaXycB8a%2FxFzXWhNCu%2ByDG0zGKnN%2F9HJBXF8Vpy46ehlmjXlpzCpBTaSCIrl%2BKZw2%2BE5neRcFVMPG5s8gGOq0CFB0IzSYSfIoPkXR30stgS%2FWC2jfValV%2BDggD3dSbaTS9REFnn0MeEym7ZL4sUa72mFcsfFXxXDt3gsReO6IaNmHwHZVdgboYu1XGajzij59qvzpsEdDWAaKbt5L1%2FjSZGeA1xp5iTDmA9q6StAfD95Zj76sQqH%2BL10RIER%2BxzEzUv52UXJt2Ucj0GdnRdzaeFThvLxCSEnes7wzrcuWEn57%2Fggg2N7jqa6846ma%2F7bVENr5eWhTk9XhEqCarN61DJCCrdX9leTm511oeqXx4YLGHFcltK%2FWw%2FCMbwFHPJEVaQ6rZBu6%2FYbcvqqKBYMTqOC2iI0K8aQOWg%2BJICn70L31SFZ0YxJp%2BVk7D%2B1d%2BnRbOIyLVtpOGT86Ba%2B4JhikQrJAMcMZYiBe69uoZ%2Fw%3D%3D&X-Amz-Signature=d86c662af9d835c5337977c8d4b01d1b59cb485d16c6d783951fd925daa49a92&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject"
            alt="Early version of Pantonify"
            loading="lazy"
            className="absolute w-full h-full object-contain px-8 pt-4 pb-1 max-w-2xl shadow-2xl rounded-lg"
            style={{ zIndex: 2 }}
            initial={{ rotate: 8, x: 20 }}
            animate={{ rotate: 8, x: 20 }}
            whileHover={{ rotate: 5, x: 15, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        </motion.div>
        <motion.p className="text-center text-sm text-gray-500 dark:text-gray-400">
          The initial splash screen
        </motion.p>
      </motion.div>
      <motion.div className="flex items-center gap-2">
        <motion.div
          className="flex justify-center items-center flex-col"
          whileInView={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <motion.p>
            After finding a set of libraries{" "}
            <a
              href="https://next-auth.js.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent hover:from-purple-500 hover:to-blue-500"
            >
              next-auth
            </a>
            ,{" "}
            <a
              href="https://github.com/alexgabe-dev/hex2pantone"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600"
            >
              hex2pantone
            </a>
            , and{" "}
            <a
              href="https://github.com/fast-average-color/fast-average-color"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600"
            >
              fast-average-color
            </a>
            , that could find the nearest Pantone color to a given hex code, I
            was able to create a simple way to generate swatches based off the
            album art of a track. With the help of the Spotify API, I was able
            to get a users top tracks from different time ranges.
          </motion.p>
        </motion.div>
        <motion.div className="flex justify-center items-center flex-col">
          <motion.img
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.5, ease: "easeInOut" }}
            src="https://amplify-d1wnt1ko8dcea-mai-afportfoliostoragebucket-s409muduvmpp.s3.us-east-1.amazonaws.com/pantonify/example-card.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZOMHIOACD3SQKW56%2F20251106%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20251106T203103Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQDK96Pp6grN9U40Dv64owdYsAzzMSzkzeG%2FSRKyrQrWNAIhAMP2nMcqaJh5UvnLxPDFWMgo6jsfEWX%2FYVSuYgdWZ3FYKuYCCK7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQAxoMNjQ5MzYwNjAxMDkyIgy1wuC7C6dWNqfAoVkqugKXdvZ2o3I3%2FbpqvWdXOxdZRItROyezTLw%2FOhW24lB8Ydo2%2FSG3AFJeowvaNSMCbcwNbq2S1f31Umr%2B7Y3M%2BLOgREbBJOGwknfs2WELHO75cV3nmMR2EFVYg6rGUwli%2Boit03A%2F0UP7iXTnIZjss5UX8El1paJhOT%2FFMlw7eoKgcSAFikAp4iHTryABH93Ej00ew8QcdQOycVgIXr5qctjYhNqXMhKtmtNilMpJ9uj10TfPCnrj6KfcqTYGB%2Fn75zUaee7MPGblIPQTEYa3txAyyUTeWnJqW%2Bg19wM3aMiooAgPGGCiuy%2BSEgaF5xhcmplp0LRHZX19B4GsdfWJlHEaNSFAozOLsqCGfClxwpj3E%2FFWOT5Q%2FBXBQvtgIVysjWOPStKwwUNu8jkF4zArYev1hg6PVRz0M1rMuDDxubPIBjqsAvHULJkLyQY1k7mCmFfUn6lIAfmt2A%2FzddgJVd8HLADw3cghGge92n5eQ%2BJMEJW8ZTlMSKzMGyZSR767xRIsziFfz%2BRThXJ8euu6NSw8TlgyepEIn6ylp%2BU%2B4r2tARqAOIyW7xT7rEih4TU3zaGkwZnS9XlvPKrIBHLKEk6ePk5Q5H5Z%2B5Mmw%2FtHQ0RyLYI2v3o9tafI8x4XVpsPnB0rjJis37o%2FeQWbAJdde5XcreT8p9QTfE2wcWwReuUxHSveNh7NrvJ%2FBrKznh%2F3hmkuMaIyb8cGqliz9t6dY470knsvW7P8gI4kLM%2F4LX3mR%2FOPn7O65nOFMfL97TGmDOudEMpSFh2h9qGxtQuwTcEGXa2MscMVTGapijYGiIAssUp3zpkKrMeHhxRtWDvykA%3D%3D&X-Amz-Signature=28bbcbcd00eaf760d6a8b6809a9063d2c5b5ab78a8836f1b16dd2aff10b451fd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject"
          />
          <motion.p className="text-center text-xs text-gray-500 dark:text-gray-400">
            An example of a generated swatch card
          </motion.p>
        </motion.div>
      </motion.div>
      <motion.div className="flex justify-center items-center gap-2">
        <motion.div className="flex justify-center  flex-col items-center">
          <motion.img
            className="w-full h-full object-contain max-w-2xl"
            src="https://amplify-d1wnt1ko8dcea-mai-afportfoliostoragebucket-s409muduvmpp.s3.us-east-1.amazonaws.com/pantonify/current.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZOMHIOACM4X3KHIH%2F20251106%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20251106T204441Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQCDZI%2BTT%2BdXwsSj9Oma4SFiprPfCi4l6ryDRHW67VPs1AIgcmPdwN85%2Fq0Weos0bB4Z1i1F6TBSuvduFHqw5B2cqgEq5gIIrv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARADGgw2NDkzNjA2MDEwOTIiDBWjQeHO0Ta%2Bk9FSwyq6AoSyBpTaa4nX%2BwX%2B41fx7xnCsG77QNL6r5GKRmuB8T53E11I%2Fa%2BOhHs7fEixgn76AFW5N1M0OfTn85Mq9YaHt%2B%2FqYj5llbIO3EijORjs9TK7Ko41U8xgj%2BConHOIPuZtdJ9tTDhG46ikhGW%2F80e6iV%2FC4e0BvsfodNucT5kNukGaNhuz94UlM0Xszrf3rHwukHEZ6CqQusOrgrTMOKhnD8K6wXbKAijb41gDtP8KY8%2Frdwga1wZC5KL%2BoDS2t7TcTZhEnTuElUfS4iQp9hcPP5C9XnvgNTaueJb8qNDueh2%2Bj1CVBenku1d152z9nFYDnCLlXbfgCxHOOzBuHBBYSKZYN9oaXycB8a%2FxFzXWhNCu%2ByDG0zGKnN%2F9HJBXF8Vpy46ehlmjXlpzCpBTaSCIrl%2BKZw2%2BE5neRcFVMPG5s8gGOq0CFB0IzSYSfIoPkXR30stgS%2FWC2jfValV%2BDggD3dSbaTS9REFnn0MeEym7ZL4sUa72mFcsfFXxXDt3gsReO6IaNmHwHZVdgboYu1XGajzij59qvzpsEdDWAaKbt5L1%2FjSZGeA1xp5iTDmA9q6StAfD95Zj76sQqH%2BL10RIER%2BxzEzUv52UXJt2Ucj0GdnRdzaeFThvLxCSEnes7wzrcuWEn57%2Fggg2N7jqa6846ma%2F7bVENr5eWhTk9XhEqCarN61DJCCrdX9leTm511oeqXx4YLGHFcltK%2FWw%2FCMbwFHPJEVaQ6rZBu6%2FYbcvqqKBYMTqOC2iI0K8aQOWg%2BJICn70L31SFZ0YxJp%2BVk7D%2B1d%2BnRbOIyLVtpOGT86Ba%2B4JhikQrJAMcMZYiBe69uoZ%2Fw%3D%3D&X-Amz-Signature=2bd9a3ca04c502b8f39d34efe3932753172a9f748b7261dfc925a6033ebbec5a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject"
          />
          <motion.p className="text-center text-xs text-gray-500 dark:text-gray-400">
            A screenshot of the simplified version of the website
          </motion.p>
        </motion.div>
        <motion.p>
          While this website is no longer existing to due new changes from the
          Spotify API, limiting how many users can have access to it, I managed
          to recreate a simplified version of it within this website.
        </motion.p>
      </motion.div>
    </div>
  );
}

export default PantonifyWindow;
