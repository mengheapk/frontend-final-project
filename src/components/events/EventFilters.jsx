import styles from './EventFilters.module.css';

const CATEGORY_OPTIONS = ['All', 'Social', 'Work', 'Study', 'Sports', 'Other'];

export default function EventFilters({
  search,
  category,
  timeFilter,
  onSearchChange,
  onCategoryChange,
  onTimeFilterChange,
}) {
  return (
    <div className={styles.filters}>
      <div className="field">
        <label htmlFor="search">Search by title</label>
        <input
          id="search"
          type="search"
          className="input"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Type a title..."
        />
      </div>

      <div className="field">
        <label htmlFor="category-filter">Category</label>
        <select
          id="category-filter"
          className="input"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          {CATEGORY_OPTIONS.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="time-filter">When</label>
        <select
          id="time-filter"
          className="input"
          value={timeFilter}
          onChange={(e) => onTimeFilterChange(e.target.value)}
        >
          <option value="all">All</option>
          <option value="upcoming">Upcoming</option>
          <option value="past">Past</option>
        </select>
      </div>
    </div>
  );
}