import { HttpErrorResponse } from "@angular/common/http";

export class BaseResponse {
    data: any;
    success!: boolean;
    error?: HttpErrorResponse;
}
