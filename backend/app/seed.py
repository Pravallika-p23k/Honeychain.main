import os
import sys

# Ensure backend root is on sys.path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.database import engine, Base, SessionLocal
from app.models import User, Beekeeper, Hive, Telemetry, Harvest, Batch, Alert
from app.routers.auth import get_password_hash

def seed_database():
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        # Check if already seeded
        if db.query(User).count() > 0:
            print("Database already contains data. Skipping seed.")
            return

        print("Seeding database with Honey Chain sample records...")

        # 1. Users
        hashed_pw = get_password_hash("password123")
        users = [
            User(
                id="RBH-4821",
                name="Ramesh Kumar",
                email="ramesh.beekeeping@gov.in",
                hashed_password=hashed_pw,
                role="beekeeper",
                role_title="Certified Rural Beekeeper",
                cluster="Andhra Pradesh - Chittoor Cluster",
                location="Madanapalle Village, Chittoor, AP",
                phone="+91 98765 43210",
                reg_no="KVIC-RBH-2024-8841",
                avatar="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
            ),
            User(
                id="KVIC-GOV-904",
                name="Dr. Anand Sharma",
                email="anand.sharma@kvic.gov.in",
                hashed_password=hashed_pw,
                role="gov_officer",
                role_title="Senior Quality Assurance Officer",
                department="Khadi & Village Industries Commission (KVIC)",
                badge_no="GOV-IN-9042",
                phone="+91 94110 12345",
                avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
            ),
            User(
                id="PROC-BUY-108",
                name="Vikram Malhotra",
                email="procurement@apexorganics.in",
                hashed_password=hashed_pw,
                role="buyer",
                role_title="Commercial Buyer & Processor",
                company="Apex Organic Honey Exports Ltd.",
                license_no="FSSAI-10019042000123",
                phone="+91 98100 55443",
                avatar="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
            )
        ]
        db.add_all(users)

        # 2. Beekeepers
        beekeepers = [
            Beekeeper(
                id="RBH-4821",
                name="Ramesh Kumar",
                cluster="Andhra Pradesh - Chittoor Cluster",
                village="Madanapalle, AP",
                hives_count=12,
                annual_prod_kg=420.0,
                verification_status="VERIFIED",
                reg_date="2024-03-15",
                phone="+91 98765 43210"
            ),
            Beekeeper(
                id="RBH-1102",
                name="Sunita Devi",
                cluster="Uttar Pradesh - Lucknow Cluster",
                village="Malihabad, UP",
                hives_count=25,
                annual_prod_kg=950.0,
                verification_status="VERIFIED",
                reg_date="2023-11-10",
                phone="+91 94120 88765"
            ),
            Beekeeper(
                id="RBH-9042",
                name="Ganesh Patil",
                cluster="Karnataka - Coorg Cluster",
                village="Somwarpet, KA",
                hives_count=8,
                annual_prod_kg=280.0,
                verification_status="PENDING",
                reg_date="2026-08-01",
                phone="+91 98450 11223"
            )
        ]
        db.add_all(beekeepers)

        # 3. Hives
        hives = [
            Hive(
                id="HC-AP-017",
                qr_id="QR-HC-AP-017-984",
                location="Madanapalle - Plot 3 (Chittoor AP)",
                colony_status="HEALTHY",
                health_score=92,
                temperature=34.8,
                humidity=54.0,
                weight=48.2,
                activity=88,
                battery=94,
                bee_species="Apis cerana indica (Indian Honey Bee)",
                queen_info="Queen #Q-2025-AP09 (Age: 1.2 yrs)",
                last_inspection="2026-08-27",
                installation_date="2025-02-14",
                weight_drop_24h=0.1
            ),
            Hive(
                id="HC-AP-018",
                qr_id="QR-HC-AP-018-985",
                location="Madanapalle - Plot 3 (Chittoor AP)",
                colony_status="ATTENTION_REQUIRED",
                health_score=68,
                temperature=38.2,
                humidity=72.0,
                weight=39.5,
                activity=62,
                battery=78,
                bee_species="Apis mellifera (European Honey Bee)",
                queen_info="Queen #Q-2024-EU01 (Age: 2.1 yrs)",
                last_inspection="2026-08-20",
                installation_date="2024-11-05",
                weight_drop_24h=0.4
            ),
            Hive(
                id="HC-AP-019",
                qr_id="QR-HC-AP-019-986",
                location="Punganur Sector 1 (Chittoor AP)",
                colony_status="HEALTHY",
                health_score=95,
                temperature=34.2,
                humidity=52.0,
                weight=52.0,
                activity=94,
                battery=98,
                bee_species="Apis cerana indica",
                queen_info="Queen #Q-2025-AP12 (Age: 0.8 yrs)",
                last_inspection="2026-08-29",
                installation_date="2025-05-10",
                weight_drop_24h=0.0
            )
        ]
        db.add_all(hives)

        # 4. Honey Batches
        batches = [
            Batch(
                id="HC-AP-2026-0001",
                batch_id="HC-AP-2026-0001",
                source_hives="HC-AP-017, HC-AP-019",
                beekeeper_id="RBH-4821",
                beekeeper_name="Ramesh Kumar",
                cluster="Andhra Pradesh - Chittoor Cluster",
                harvest_date="2026-08-28",
                quantity_kg=45.0,
                floral_source="Wildflower & Mustard",
                location="Madanapalle, Chittoor, AP",
                collector="Ramesh Kumar",
                notes="First monsoon harvest. Clear amber color.",
                quality_status="PASSED_KVIC_TEST",
                processing_status="PACKAGED",
                blockchain_status="CONFIRMED_ON_CHAIN",
                purity_score="99.4%",
                moisture_content="17.2%",
                hmf_ppm="12 mg/kg",
                c4_sugar_test="Passed (<7% negative)",
                qr_code_url="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=HC-AP-2026-0001",
                price_per_kg=650.0,
                is_listed_on_marketplace=True
            ),
            Batch(
                id="HC-UP-2026-0084",
                batch_id="HC-UP-2026-0084",
                source_hives="HC-UP-001",
                beekeeper_id="RBH-1102",
                beekeeper_name="Sunita Devi",
                cluster="Uttar Pradesh - Lucknow Cluster",
                harvest_date="2026-08-25",
                quantity_kg=120.0,
                floral_source="Eucalyptus Bloom",
                location="Lucknow District, UP",
                collector="Sunita Devi",
                notes="Mono-floral Eucalyptus extraction.",
                quality_status="PASSED_KVIC_TEST",
                processing_status="FOR_SALE",
                blockchain_status="CONFIRMED_ON_CHAIN",
                purity_score="98.9%",
                moisture_content="16.8%",
                hmf_ppm="14 mg/kg",
                c4_sugar_test="Passed",
                qr_code_url="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=HC-UP-2026-0084",
                price_per_kg=720.0,
                is_listed_on_marketplace=True
            )
        ]
        db.add_all(batches)

        # 5. Alerts
        alerts = [
            Alert(
                id="ALT-2026-101",
                hive_id="HC-AP-018",
                title="High Temperature & Humidity Alert",
                type="TEMP_HUMIDITY_HIGH",
                severity="WARNING",
                message="Hive HC-AP-018 registered 38.2°C and 72% humidity.",
                timestamp="2026-09-01 08:15:00",
                read=False
            )
        ]
        db.add_all(alerts)

        db.commit()
        print("Database seeded successfully with sample records!")
    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
