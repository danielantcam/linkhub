import Navbar from "components/Navbar";

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen py-16 bg-neutral-950 text-white">
        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-neutral-400 text-lg font-medium mb-8">
          Last updated: August 6, 2025
        </p>

        <p className="text-lg mb-8">
          This website is a personal project developed solely for demonstration and portfolio purposes. It is not intended for commercial use or access by end users. However, the following section outlines how any potentially collected data is handled.
        </p>

        <ol className="flex flex-col gap-8 text-lg">
          <li>
            <h2 className="text-xl font-semibold mb-2">1. Data Collection</h2>
            <p>
              This site may collect information voluntarily entered by the user (e.g., names, links, or uploaded profile images). No tracking, behavioral analysis, or automatic data collection is performed via cookies or third-party tools.
            </p>
          </li>

          <li>
            <h2 className="text-xl font-semibold mb-2">2. Use of Data</h2>
            <p>
              Any data entered, if any, is used solely for functional purposes within the application. It is never shared, sold, or transferred to third parties under any circumstances.
            </p>
          </li>

          <li>
            <h2 className="text-xl font-semibold mb-2">3. Data Storage</h2>
            <p>
              Data is stored only to maintain the internal functionality of the project. There is no long-term persistence or database intended for commercial exploitation.
            </p>
          </li>

          <li>
            <h2 className="text-xl font-semibold mb-2">4. Use of Third-Party Services</h2>
            <p>
              Uploaded images are stored and managed using Cloudinary, a third-party cloud service provider that processes and delivers media content. By using this service, users acknowledge that their images may be handled according to Cloudinary's <a href="https://cloudinary.com/privacy" target="_blank" rel="noopener noreferrer" className="underline text-blue-400 hover:text-blue-300">Privacy Policy</a>.
            </p>
            <p>
              Additionally, user authentication may be performed through external providers such as Google or GitHub. These services may collect and process certain personal information according to their own privacy policies. Users agree to the use of these providers when logging in. For more details, see Google's <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline text-blue-400 hover:text-blue-300">Privacy Policy</a> and GitHub's <a href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement" target="_blank" rel="noopener noreferrer" className="underline text-blue-400 hover:text-blue-300">Privacy Statement</a>.
            </p>
          </li>

          <li>
            <h2 className="text-xl font-semibold mb-2">5. User Rights</h2>
            <p>
              Since this project does not manage real accounts or identify users, there is no formal mechanism for exercising rights of access, correction, or deletion. However, any request to remove data can be made by contacting the developer.
            </p>
          </li>

          <li>
            <h2 className="text-xl font-semibold mb-2">6. Contact</h2>
            <p>
              For any questions about this policy or the project itself, you can reach out via <a href="mailto:danielanton@danielantcam.dev" className="underline text-blue-400 hover:text-blue-300">danielanton@danielantcam.dev</a>.
            </p>
          </li>
        </ol>
      </main>
    </>
  );
}
