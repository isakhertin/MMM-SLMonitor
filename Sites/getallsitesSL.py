import requests

# URL for the SL Transport API /sites endpoint
API_URL = "https://transport.integration.sl.se/v1/sites"
OUTPUT_FILE = "SiteID.md"

def fetch_and_save_site_ids():
    try:
        response = requests.get(API_URL)
        
        if response.status_code != 200:
            print(f"Failed to fetch data. Status code: {response.status_code}")
            return
        
        sites_data = response.json()
        
        with open(OUTPUT_FILE, "w", encoding="utf-8") as file:
            file.write("# SL Transport API SiteIDs\n\n")
            file.write("| Station Name                  | SiteID    |\n")
            file.write("|-------------------------------|-----------|\n")
            
            for site in sites_data:
                site_id = site.get("id", "N/A")
                site_name = site.get("name", "Unknown")
                file.write(f"| {site_name:<29} | {site_id:<9} |\n")
            
            file.write("\n")
            file.write(f"**Total sites found:** {len(sites_data)}\n")
        
        print(f"Data successfully saved to {OUTPUT_FILE}")
        
    except requests.exceptions.RequestException as e:
        print(f"An error occurred while fetching data: {e}")
    except ValueError as e:
        print(f"Error parsing JSON response: {e}")
    except IOError as e:
        print(f"Error writing to file: {e}")

if __name__ == "__main__":
    fetch_and_save_site_ids()