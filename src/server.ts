// @ts-ignore
import { GitIngest } from "git-analysts";
import express from "express";
import cors from "cors";

const app: any = express();
const port = process.env.PORT || 3789;
app.use(cors());

const ingest = new GitIngest({
  // 默认最大文件大小
  defaultMaxFileSize: 1000000,
  // 默认文件模式
  defaultPatterns: {
    include: ["**/*"],
    exclude: [
      "**/node_modules/**",
      "**/.git/**",
      "**/dist/**",
      "**/build/**",
      "*.lock",
      "pnpm-lock.yaml",
    ],
  },
});

app.use(express.json());

// 添加API路由
app.post("/analyze", async (req: any, res: any) => {
  try {
    const { url, branch, targetPaths, maxFileSize } = req.body;
    const result = await ingest.analyzeFromUrl(url, {
      branch,
      targetPaths,
      maxFileSize,
    });

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
});

// 更新搜索API路由
// app.post("/search", async (req, res) => {
//   try {
//     const { knowledgeGraph, ...rest } = req.body;
//     const searchResults = searchKnowledgeGraph(knowledgeGraph, rest);

//     res.json({ success: true, data: searchResults });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: error.message,
//     });
//   }
// });

app.post("/test", (req: any, res: any) => {
  res.json({ success: true, data: "Hello World22" });
});

// 启动服务器
app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
});

export default app;