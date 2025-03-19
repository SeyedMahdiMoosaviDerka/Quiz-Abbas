import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SW, keyOfSw } from './swagger-config';

export function ApiDocDecorator(endpoint: keyOfSw) {
  const { operation, responses } = SW[endpoint];
  return applyDecorators(
    ApiOperation(operation),
    ...responses.map((response) => ApiResponse(response))
  );
}
