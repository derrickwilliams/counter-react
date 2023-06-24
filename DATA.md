Models
- Catalog - Available TallyItems
- TallyItem - Single available item to track with tallies
- TallyItemTracked - Tracked instance of an item
- DailyRecording -
- RecordingHistory



### DBML
```dbml
Table trackables {
  id string [primary key]
  name string
  unit string
}

Table tally_set {
  id string [primary key]
  name string
}

Table tally_set_trackables {
  id string [primary key]
  trackable_id string
  tally_set_id string
  goal number
}

Table tracking_entries {
  id string [primary key]
  tally_set_trackables_id string
  date date
  value number
}

Ref: tally_set_trackables.trackable_id > trackables.id
Ref: tally_set_trackables.tally_set_id > tally_set.id
Ref: tracking_entries.tally_set_trackables_id > tally_set_trackables.id
```
