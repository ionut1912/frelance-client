interface CreateReviewRequest {
  reviewText: string;
}

interface ReviewsDto {
  id: number;
  reviewerId: number;
  reviewText: string;
  createdAt: Date;
  updatedAt?: Date;
}

interface UpdateReviewRequest {
  reviewText?: string;
}

export type { CreateReviewRequest, ReviewsDto, UpdateReviewRequest };
