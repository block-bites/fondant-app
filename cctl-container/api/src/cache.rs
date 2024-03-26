extern crate sse_client;

use std::collections::HashMap;
use std::sync::{Arc, Mutex};
use sse_client::EventSource;

struct SseCache {
    data: Arc<Mutex<HashMap<String, Vec<String>>>>,
    capacity: i32,
}

impl SseCache {
    fn new(capacity: i32) -> SseCache {
        SseCache {
            data: Arc::new(Mutex::new(HashMap::new())),
            capacity: capacity,
        }
    }

    fn start_listening(&self, url: String) {
        let event_source = EventSource::new(&url).unwrap();
        self.data.lock().unwrap().insert(url.clone(), Vec::new());

        let data = Arc::clone(&self.data);
        let capacity = self.capacity;
        event_source.on_message(move |message| {
            let mut cache = data.lock().unwrap();
            if let Some(messages) = cache.get_mut(&url) {
                messages.push(message.data.clone());
                if messages.len() as i32 > capacity {
                    messages.remove(0);
                }
            }
        });

        event_source.add_event_listener("error", |error| {
            println!("Error {:?}", error);
        });
    }

    fn get_data(&self, url: &String) -> Option<Vec<String>> {
        self.data.lock().unwrap().get(url).cloned()
    }
}