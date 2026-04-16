from fastapi import APIRouter, Depends
from app.models.schemas import DutyRequest, DutyResponse

router = APIRouter()

@router.post("/calculate", response_model=DutyResponse)
def calculate_duty(request: DutyRequest):
    base_duty_rate = 0.08 if request.destination_country.lower() == "us" else 0.05
    total_duty = request.declared_value * base_duty_rate
    return DutyResponse(
        hsn_code=request.hsn_code,
        total_duty=total_duty,
        tax_breakdown=f'{{"import_duty": "{base_duty_rate * 100}%"}}',
        currency="USD"
    )
