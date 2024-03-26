extern crate sse_client;
use sse_client::EventSource;

mod cache{
struct SseCache {
    data : HashMap<String, Vec<String>,
    capacity : i32,
}

impl SseCache{

    fn new(capacity: i32) -> SseCache{
        SseCache{
            data: HashMap::new(),
            capacity: capacity,
        }
    }


    fn start_listening(&self, &url: String){
        let event_source = EventSource::new(url).unwrap();

        self.data.insert(url, Vec::new());

        event_source.on_message(|message| {
            self.data.get_mut(url).push(message);
            if self.data.get(url).len() > self.capacity {
                self.data.get_mut(url).remove(0);
            }
        }); 

        event_source.add_event_listener("error", |error| {
            println!("Error {:?}", error);
        });    
    }

    fn show_events(&self, url: String) -> Vec<String>{
        let events = self.data.get(url);
        events 
    }
}
}