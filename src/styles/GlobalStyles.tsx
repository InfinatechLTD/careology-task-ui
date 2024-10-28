import { Global, css } from "@emotion/react";

const GlobalStyles = () => (
  <Global
    styles={css`
      @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap");

      :root {
        --green-color: #00C495; /* Define the CSS variable here */
      }

      html,
      body,
      #root {
        height: 100%;
        margin: 0;
        padding: 0;
      }

      body {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        font-family: "Poppins", sans-serif;
        font-size: 16px;
        color: #333;
      }

      h3.ant-typography {
        font-family: inherit;
        font-size: 24px;
        font-weight: 300;
        color: #333;
        margin-bottom: 16px;
        margin-top: 0;
      }

      .ant-typography + h2.ant-typography {
        margin-top: 0px;
      }

      h2.ant-typography {
        font-family: inherit;
        font-size: 31px;
        font-weight: 700;
        color: #333;
        margin-bottom: 0px;
        margin-top: 0px; !important;
      }

      h3.ant-typography {
        font-family: inherit;
        font-size: 28px;
        font-weight: 700;
        color: #333;
        margin-bottom: 0px;
        margin-top: 0px; !important;
      }

      h4.ant-typography {
        font-family: inherit;
        font-size: 16px;
        font-weight: 700;
        color: #333;
        margin-bottom: 16px;
        margin-top: 32px; 
      }

      span.ant-typography {
        font-family: inherit;
        font-size: 16px;
        font-weight: 400;
        margin-bottom: 16px;
        margin-top: 0px;
      }
    `}
  />
);

export default GlobalStyles;
