from fastapi import APIRouter, Depends
from app.models.schemas import DutyRequest, DutyResponse

router = APIRouter()

@router.post("/calculate", response_model=DutyResponse)
def calculate_duty(request: DutyRequest):
    """
    Mock endpoint for Duty & Tax calculations.
    Returns shipping quotes and duties in 30 seconds.
    """
    # Simple mock logic based on destination
    base_duty_rate = 0.05
    if request.destination_country.lower() == "us":
        base_duty_rate = 0.08
    elif request.destination_country.lower() == "eu":
        base_duty_rate = 0.12
        
    total_duty = request.declared_value * base_duty_rate
    
    return DutyResponse(
        hsn_code=request.hsn_code,
        total_duty=total_duty,
        tax_breakdown=f'{{"import_duty": "{base_duty_rate * 100}%"}}',
        currency="USD"
    )
