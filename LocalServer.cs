using System;
using System.IO;
using System.Net;
using System.Threading;
using System.Diagnostics;

namespace SimpleWebServer
{
    class Program
    {
        static void Main(string[] args)
        {
            int port = 8080;
            string rootDirectory = Directory.GetCurrentDirectory();

            HttpListener listener = null;
            while (port < 8090)
            {
                try
                {
                    listener = new HttpListener();
                    listener.Prefixes.Add("http://localhost:" + port + "/");
                    listener.Start();
                    break;
                }
                catch
                {
                    if (listener != null) listener.Close();
                    port++;
                }
            }

            if (listener == null || !listener.IsListening)
            {
                Console.WriteLine("Could not start server. Ports 8080-8089 are in use or access denied.");
                Console.WriteLine("Press any key to exit...");
                Console.ReadKey();
                return;
            }

            Console.WriteLine("Starting local server on port " + port + "...");
            Console.WriteLine("Serving files from: " + rootDirectory);
            Console.WriteLine("Press Ctrl+C to stop.");
            
            // Automatically open browser window
            ProcessStartInfo proc = new ProcessStartInfo();
            proc.UseShellExecute = true;
            proc.FileName = "http://localhost:" + port + "/index.html";
            Process.Start(proc);

            while (true)
            {
                try
                {
                    HttpListenerContext context = listener.GetContext();
                    ThreadPool.QueueUserWorkItem(ProcessRequest, new object[] { context, rootDirectory });
                }
                catch (Exception e)
                {
                    Console.WriteLine("Error receiving request: " + e.Message);
                }
            }
        }

        static void ProcessRequest(object state)
        {
            object[] arr = (object[])state;
            HttpListenerContext context = (HttpListenerContext)arr[0];
            string rootDirectory = (string)arr[1];
            
            HttpListenerRequest request = context.Request;
            HttpListenerResponse response = context.Response;

            string rawUrl = request.RawUrl;
            int questionMarkIndex = rawUrl.IndexOf('?');
            if (questionMarkIndex != -1)
                rawUrl = rawUrl.Substring(0, questionMarkIndex);

            // Default file
            if (rawUrl == "/") rawUrl = "/index.html";

            rawUrl = Uri.UnescapeDataString(rawUrl);
            string filePath = Path.Combine(rootDirectory, rawUrl.TrimStart('/'));
            filePath = Path.GetFullPath(filePath);

            try
            {
                if (!filePath.StartsWith(rootDirectory, StringComparison.OrdinalIgnoreCase) || !File.Exists(filePath))
                {
                    response.StatusCode = (int)HttpStatusCode.NotFound;
                    response.Close();
                    return;
                }

                byte[] buffer = File.ReadAllBytes(filePath);

                // Guess content type
                string extension = Path.GetExtension(filePath).ToLower();
                string contentType = "application/octet-stream";
                if (extension == ".html") contentType = "text/html; charset=utf-8";
                else if (extension == ".js") contentType = "application/javascript; charset=utf-8";
                else if (extension == ".css") contentType = "text/css; charset=utf-8";
                else if (extension == ".json") contentType = "application/json; charset=utf-8";
                else if (extension == ".png") contentType = "image/png";
                else if (extension == ".jpg") contentType = "image/jpeg";
                else if (extension == ".svg") contentType = "image/svg+xml";
                else if (extension == ".xlsx") contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

                response.ContentType = contentType;
                
                // Allow CORS 
                response.AppendHeader("Access-Control-Allow-Origin", "*");

                response.ContentLength64 = buffer.Length;
                Stream output = response.OutputStream;
                output.Write(buffer, 0, buffer.Length);
                output.Close();
            }
            catch (Exception ex)
            {
                response.StatusCode = (int)HttpStatusCode.InternalServerError;
                Console.WriteLine("Error serving " + request.RawUrl + ": " + ex.Message);
                response.Close();
            }
        }
    }
}
