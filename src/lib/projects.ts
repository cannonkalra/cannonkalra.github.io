/** Curated work. Kept here — projects are stable and few. */
export const PROJECTS: {
  name: string;
  summary: string;
  tags: string[];
  href?: string;
  source?: string;
}[] = [
  {
    name: "Multi-tenant Lakehouse",
    summary:
      "An Apache Iceberg + Athena lakehouse unifying real-time and batch pipelines, processing 2B+ events/month with strong cost and performance guarantees.",
    tags: ["Iceberg", "Athena", "PySpark"],
  },
  {
    name: "Streaming Modernization",
    summary:
      "Rebuilt legacy batch frameworks on PySpark + Airflow for 10× throughput and 35% lower operating cost, with SLA-backed data quality checks.",
    tags: ["Airflow", "Spark", "Observability"],
  },
  {
    name: "Industrial IoT Platform",
    summary:
      "A real-time telemetry platform ingesting 2M+ messages, powering predictive maintenance across global factory deployments.",
    tags: ["Kafka", "Kappa", "Time-series"],
  },
];
