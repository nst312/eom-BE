import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { company_policy, department_master } from '@prisma/client';
import { PolicyDto } from './company-policy.dto';
import { SuccessMessageDTO } from '../posts/post.dto';

@Injectable()
export class CompanyPolicyService {
  constructor(private prisma: PrismaService) {}

  async createPolicy(body, user): Promise<company_policy> {
    const company_id = user.company_id;
    const data = {
      ...body,
      company_id,
    };
    return this.prisma.company_policy.create({ data });
  }

  async getAllPolicy(user): Promise<PolicyDto> {
    const company_id = user.company_id;
    const count = await this.prisma.company_policy.count({
      where: {
        deletedAt: null,
        company_id,
      },
    });
    const data = await this.prisma.company_policy.findMany({
      where: {
        deletedAt: null,
        company_id,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
    return { count, data };
  }

  async getPolicy(user, policyId) {
    const company_id = user.company_id;
    const data = await this.prisma.company_policy.findMany({
      where: {
        deletedAt: null,
        company_id,
        id: Number(policyId),
      },
    });
    return data;
  }

  async updatePolicy(data, policyId, user) {
    return await this.prisma.company_policy.update({
      where: {
        id: Number(policyId),
      },
      data,
    });
  }

  async deletePolicy(where): Promise<company_policy | SuccessMessageDTO> {
    await this.findPolicy(where);
    await this.prisma.company_policy.update({
      where,
      data: {
        deletedAt: new Date(),
      },
    });
    return { message: 'Company Policy successfully Deleted' };
  }

  async findPolicy(where): Promise<company_policy> {
    try {
      const response = await this.prisma.company_policy.findUnique({
        where,
      });
      if (response.deletedAt)
        throw new BadRequestException('Company Policy not found.');
      return response;
    } catch (e) {
      throw new BadRequestException('Company Policy not found.');
    }
  }
}
