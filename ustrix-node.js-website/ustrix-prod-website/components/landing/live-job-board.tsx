'use client';

import { useMemo, useState } from 'react';
import { JOB_ROWS } from './data';
import { useLanding } from './landing-provider';
import styles from './landing.module.css';

function statusBadgeClass(status: string) {
  if (status === 'New') return styles.scheduleBadgeNew;
  if (status === 'In Progress') return styles.scheduleBadgeProgress;
  return styles.scheduleBadgeDone;
}

export default function LiveJobBoard() {
  const { t } = useLanding();
  const [provinceFilter, setProvinceFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [paused, setPaused] = useState(false);

  const provinces = useMemo(
    () => ['All', ...new Set(JOB_ROWS.map((j) => j.province))],
    []
  );
  const categories = useMemo(
    () => ['All', ...new Set(JOB_ROWS.map((j) => j.category))],
    []
  );
  const statuses = useMemo(
    () => ['All', ...new Set(JOB_ROWS.map((j) => j.status))],
    []
  );

  const filteredJobs = useMemo(
    () =>
      JOB_ROWS.filter((j) => {
        if (provinceFilter !== 'All' && j.province !== provinceFilter) {
          return false;
        }
        if (categoryFilter !== 'All' && j.category !== categoryFilter) {
          return false;
        }
        if (statusFilter !== 'All' && j.status !== statusFilter) {
          return false;
        }
        return true;
      }),
    [provinceFilter, categoryFilter, statusFilter]
  );

  const scrollJobs = useMemo(
    () => [...filteredJobs, ...filteredJobs],
    [filteredJobs]
  );

  return (
    <section
      id="live-job-board"
      className={styles.scheduleSection}
      aria-labelledby="jobs-title"
    >
      <div className={styles.container}>
        <div className={styles.scheduleHeader}>
          <div>
            <p className={styles.scheduleEyebrow}>{t.scheduleEyebrow}</p>
            <h2 id="jobs-title" className={styles.scheduleTitle}>
              {t.scheduleTitle}
            </h2>
          </div>
          <div className={styles.scheduleHeaderMeta}>
            <span className={styles.scheduleStatChip}>
              {filteredJobs.length} active listings
            </span>
            <div className={styles.filters}>
              <select
                className={styles.filterSelectLight}
                value={provinceFilter}
                onChange={(e) => setProvinceFilter(e.target.value)}
                aria-label="Filter by province"
              >
              {provinces.map((p) => (
                <option key={p} value={p}>
                  {p === 'All' ? 'All Provinces' : p}
                </option>
              ))}
            </select>
            <select
              className={styles.filterSelectLight}
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              aria-label="Filter by category"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === 'All' ? 'All Categories' : c}
                </option>
              ))}
            </select>
            <select
              className={styles.filterSelectLight}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Filter by status"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s === 'All' ? 'All Statuses' : s}
                </option>
              ))}
            </select>
            </div>
          </div>
        </div>

        <div className={styles.scheduleCrystalFrame}>
          <span className={styles.scheduleFrameAccent} aria-hidden="true" />
          <div className={styles.scheduleCrystalInner}>
        <div
          className={styles.scheduleBoard}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className={styles.scheduleBoardHead}>
            <span>Province</span>
            <span>City</span>
            <span>ZIP / Postal</span>
            <span>Job Description</span>
            <span>Posted</span>
            <span>Closing</span>
            <span>Status</span>
          </div>
          <div className={styles.scheduleViewport}>
            <div
              className={`${styles.scheduleTrack} ${paused ? styles.scheduleScrollPaused : ''}`}
            >
              {scrollJobs.map((job, idx) => (
                <div
                  key={`${job.id}-${idx}`}
                  className={`${styles.scheduleRow} ${idx % 2 === 0 ? styles.scheduleRowAlt : ''}`}
                >
                  <span>{job.province}</span>
                  <span>{job.city}</span>
                  <span>{job.postal}</span>
                  <span className={styles.scheduleDesc}>{job.description}</span>
                  <span className={styles.scheduleDate}>{job.posted}</span>
                  <span className={styles.scheduleDate}>{job.closing}</span>
                  <span>
                    <span className={statusBadgeClass(job.status)}>
                      {job.status}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
          </div>
        </div>

        <div className={styles.scheduleCrystalFrameMobile}>
          <span className={styles.scheduleFrameAccent} aria-hidden="true" />
          <div className={styles.scheduleCrystalInnerMobile}>
        <div className={styles.scheduleMobile}>
          {filteredJobs.map((job) => (
            <article key={job.id} className={styles.scheduleMobileCard}>
              <div className={styles.scheduleMobileCardHead}>
                <span>
                  {job.city}, {job.province}
                </span>
                <span className={statusBadgeClass(job.status)}>
                  {job.status}
                </span>
              </div>
              <p className={styles.scheduleMobileDesc}>{job.description}</p>
              <div className={styles.scheduleMobileMeta}>
                <span>{job.postal}</span>
                <span>
                  {job.posted} → {job.closing}
                </span>
              </div>
            </article>
          ))}
        </div>
          </div>
        </div>
      </div>
    </section>
  );
}
