import React from 'react';
import { CheckCircle, AlertTriangle, Clock, ShieldCheck, XCircle } from 'lucide-react';

export const StatusBadge = ({ status, text }) => {
  switch (status) {
    case 'HEALTHY':
    case 'EXCELLENT':
    case 'PASSED_KVIC_TEST':
    case 'CONFIRMED_ON_CHAIN':
    case 'VERIFIED':
      return (
        <span className="gov-badge gov-badge-success">
          <CheckCircle className="w-3.5 h-3.5" />
          {text || status.replace(/_/g, ' ')}
        </span>
      );

    case 'ATTENTION_REQUIRED':
    case 'IN_TESTING':
    case 'PROCESSING':
    case 'WARNING':
    case 'PENDING':
      return (
        <span className="gov-badge gov-badge-warning">
          <Clock className="w-3.5 h-3.5" />
          {text || status.replace(/_/g, ' ')}
        </span>
      );

    case 'SWARMING_RISK':
    case 'CRITICAL':
    case 'REJECTED':
    case 'FAILED':
      return (
        <span className="gov-badge gov-badge-danger">
          <AlertTriangle className="w-3.5 h-3.5" />
          {text || status.replace(/_/g, ' ')}
        </span>
      );

    case 'PACKAGED':
    case 'FOR_SALE':
      return (
        <span className="gov-badge gov-badge-info">
          <ShieldCheck className="w-3.5 h-3.5" />
          {text || status.replace(/_/g, ' ')}
        </span>
      );

    default:
      return (
        <span className="gov-badge gov-badge-neutral">
          {text || status}
        </span>
      );
  }
};
