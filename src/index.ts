import app from "./app";
import { PORT } from "./common/constants/constants";

app.listen(PORT, () => {
  console.log(
    `Server is running on port http://localhost:${PORT}\nSwagger: http://localhost:${PORT}/api`,
  );
});
