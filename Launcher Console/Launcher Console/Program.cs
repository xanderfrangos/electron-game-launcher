using System;
using System.Collections.Generic;
using System.IO;
using Microsoft.Win32;
using Newtonsoft.Json;
using Steam_acf_File_Reader;
using System.Text.RegularExpressions;
using System.Net;

namespace Launcher_Console {

    public class AppInfo {
        public string name;
        public string id;
        public string source;
        public string fileSource;
    }

    class Program {
        static void Main(string[] args) {

            // Convert args to a List because it's easier to work with
            List<string> argsList = new List<string>(args);

            List<AppInfo> AllApps = new List<AppInfo>();

            // Find default Steam directory from Windows Registry
            string SteamLocation = Registry.GetValue(@"HKEY_CURRENT_USER\Software\Valve\Steam", @"SteamPath", "").ToString();
            string SteamAppsLocation = SteamLocation + @"/steamapps";

            if (Directory.Exists(SteamAppsLocation)) {

                // Add games from default library
                string[] files = Directory.GetFiles(SteamAppsLocation);
                AllApps.AddRange(ReadSteamManifestsFromDir(SteamAppsLocation));

                // Look up other Steam libraries
                string[] otherLibraries = GetSteamLibraryFolders(SteamAppsLocation);

                // Add games from other libraries
                foreach (string library in otherLibraries) {
                    AllApps.AddRange(ReadSteamManifestsFromDir(library));
                }

                string json = JsonConvert.SerializeObject(AllApps);

                // Write apps DB file
                File.WriteAllText("apps.json", json);
                Console.WriteLine("\r\nDatabase saved to apps.json!");

                if (argsList.Contains("-buildcache")) {
                    Console.WriteLine("\r\nAcquiring game graphics from Steam...");
                    if (!Directory.Exists("cache")) {
                        Directory.CreateDirectory("cache");
                    }
                    foreach (AppInfo app in AllApps) {
                        Console.WriteLine("Downloading images for " + app.name + " (" + app.id + ")");

                        if (!Directory.Exists("cache/" + app.id)) {
                            Directory.CreateDirectory("cache/" + app.id);
                        }
                        try {
                            WebClient webClient1 = new WebClient();
                            webClient1.DownloadFile(new Uri("http://cdn.akamai.steamstatic.com/steam/apps/" + app.id + "/header.jpg"), @"cache/" + app.id + "/header.jpg");
                            WebClient webClient2 = new WebClient();
                            webClient2.DownloadFile(new Uri("http://cdn.edgecast.steamstatic.com/steam/apps/" + app.id + "/capsule_616x353.jpg"), @"cache/" + app.id + "/capsule_616x353.jpg");
                        } catch(Exception e) {

                        }

                    }
                }

            }


            Console.WriteLine("\r\nDone!");
            Console.ReadKey();

        }

        //
        //  Find extra Steam libraries
        //
        static string[] GetSteamLibraryFolders(string SteamAppsLocation) {

            List<string> outList = new List<string>();
            if (Directory.Exists(SteamAppsLocation) && File.Exists(SteamAppsLocation + "/libraryfolders.vdf")) {
                AcfReader acfReader = new AcfReader(SteamAppsLocation + "/libraryfolders.vdf");
                ACF_Struct acf = acfReader.ACFFileToStruct();

                foreach(string key in acf.SubACF["LibraryFolders"].SubItems.Keys) {
                    if(Regex.IsMatch(key, @"^\d+$")) {
                        outList.Add(acf.SubACF["LibraryFolders"].SubItems[key] + "/steamapps");
                        Console.WriteLine("Found Steam library at " + acf.SubACF["LibraryFolders"].SubItems[key] + "/steamapps");
                    }
                }
            }
            return outList.ToArray();

        }

        // 
        //  Load ACF files from a given directory and return the ACFs' data
        //
        static List<AppInfo> ReadSteamManifestsFromDir(string directory) {

            List<AppInfo> apps = new List<AppInfo>();
            Console.WriteLine("Scanning for games in " + directory);
            if (Directory.Exists(directory)) {
                string[] files = Directory.GetFiles(directory);
                List<string> acfFiles = new List<string>();
                foreach (string file in files) {
                    if (file.Substring(file.Length - 4) == ".acf") {
                        acfFiles.Add(file);
                    }
                }
                foreach(string file in acfFiles) {
                    AcfReader acfReader = new AcfReader(file);
                    ACF_Struct acf = acfReader.ACFFileToStruct();

                    AppInfo app = new AppInfo();
                    app.name = acf.SubACF["AppState"].SubItems["name"];
                    app.id = acf.SubACF["AppState"].SubItems["appid"];
                    app.source = "Steam";
                    app.fileSource = file;

                    apps.Add(app);

                    Console.WriteLine("Added " + app.name + " (" + app.id + ") to the database");
                }
            }
            return apps;
        }
    }
}
