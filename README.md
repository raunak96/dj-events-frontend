This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

- Install the dependencies
  ```bash
  yarn
  # or
  npm install
  ```
    - ### Strapi Backend SetUp
  
      - Clone the Repo containing the **Strapi** backend from [here](https://github.com/raunak96/dj-events-backend) or follow these instructions:
        ```bash
        git clone https://github.com/raunak96/dj-events-backend
        ```
      - Start the backend server locally :
        ```bash
        yarn
        yarn develop
        ```
      - Open [http://localhost:1337/admin](http://localhost:1337/admin) with your browser to see the result.
  

- Run the development server:

    ```bash
    yarn dev
    # or
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### MODULE ALIASING WITH **jsonconfig.json** file
- Instead of importing commonly used files with path relative to root of project we can set alias for them in jsonconfig.json file.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


[![wakatime](https://wakatime.com/badge/github/raunak96/dj-events-frontend.svg)](https://wakatime.com/badge/github/raunak96/dj-events-frontend)