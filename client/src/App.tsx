import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

// Layouts
import { PublicLayout } from './components/layout/PublicLayout';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { AdminLayout } from './components/layout/AdminLayout';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { AboutPage } from './pages/public/AboutPage';
import { HowItWorksPage } from './pages/public/HowItWorksPage';
import { MembershipsPage } from './pages/public/MembershipsPage';
import { RewardsPage } from './pages/public/RewardsPage';
import { LevelsPage } from './pages/public/LevelsPage';
import { BenefitsPage } from './pages/public/BenefitsPage';
import { GoodiesPage } from './pages/public/GoodiesPage';
import { SocialImpactPage } from './pages/public/SocialImpactPage';
import { EducationPage } from './pages/public/EducationPage';
import { HealthcarePage } from './pages/public/HealthcarePage';
import { InsurancePage } from './pages/public/InsurancePage';
import { FAQPage } from './pages/public/FAQPage';
import { ContactPage } from './pages/public/ContactPage';

// Legal Pages
import { TermsPage } from './pages/legal/TermsPage';
import { PrivacyPage } from './pages/legal/PrivacyPage';
import { RefundPolicyPage } from './pages/legal/RefundPolicyPage';
import { RewardPolicyPage } from './pages/legal/RewardPolicyPage';
import { CompliancePage } from './pages/legal/CompliancePage';

// Auth Pages
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';

// User Dashboard Pages
import { DashboardOverviewPage } from './pages/user/DashboardOverviewPage';
import { ProfilePage } from './pages/user/ProfilePage';
import { MembershipPage as UserMembershipPage } from './pages/user/MembershipPage';
import { NetworkTreePage } from './pages/user/NetworkTreePage';
import { ReferralsPage } from './pages/user/ReferralsPage';
import { PointsPage } from './pages/user/PointsPage';
import { RewardsStorePage } from './pages/user/RewardsStorePage';
import { BenefitsCenterPage } from './pages/user/BenefitsCenterPage';
import { EducationSupportPage } from './pages/user/EducationSupportPage';
import { HealthcarePage as UserHealthcarePage } from './pages/user/HealthcarePage';
import { InsurancePage as UserInsurancePage } from './pages/user/InsurancePage';
import { SocialImpactPage as UserSocialImpactPage } from './pages/user/SocialImpactPage';
import { OrdersPage } from './pages/user/OrdersPage';
import { SupportPage } from './pages/user/SupportPage';
import { SettingsPage } from './pages/user/SettingsPage';

// Admin CRM Pages
import { AdminOverviewPage } from './pages/admin/AdminOverviewPage';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminRulesPage } from './pages/admin/AdminRulesPage';
import { AdminPointsLedgerPage } from './pages/admin/AdminPointsLedgerPage';
import { AdminClaimsPage } from './pages/admin/AdminClaimsPage';
import { AdminRedemptionsPage } from './pages/admin/AdminRedemptionsPage';
import { AdminAuditLogsPage } from './pages/admin/AdminAuditLogsPage';
import { AdminInquiriesPage } from './pages/admin/AdminInquiriesPage';
import { OwnerMasterControlPage } from './pages/admin/OwnerMasterControlPage';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            {/* Public Layout and Pages */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/memberships" element={<MembershipsPage />} />
              <Route path="/rewards" element={<RewardsPage />} />
              <Route path="/levels" element={<LevelsPage />} />
              <Route path="/benefits" element={<BenefitsPage />} />
              <Route path="/goodies" element={<GoodiesPage />} />
              <Route path="/social-impact" element={<SocialImpactPage />} />
              <Route path="/education" element={<EducationPage />} />
              <Route path="/healthcare" element={<HealthcarePage />} />
              <Route path="/insurance" element={<InsurancePage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/contact" element={<ContactPage />} />

              {/* Legal Pages */}
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/refund-policy" element={<RefundPolicyPage />} />
              <Route path="/reward-policy" element={<RewardPolicyPage />} />
              <Route path="/compliance" element={<CompliancePage />} />

              {/* Auth Pages */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/join/:refCode" element={<RegisterPage />} />
            </Route>

            {/* User Dashboard Routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardOverviewPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="membership" element={<UserMembershipPage />} />
              <Route path="network" element={<NetworkTreePage />} />
              <Route path="referrals" element={<ReferralsPage />} />
              <Route path="points" element={<PointsPage />} />
              <Route path="rewards" element={<RewardsStorePage />} />
              <Route path="benefits" element={<BenefitsCenterPage />} />
              <Route path="education" element={<EducationSupportPage />} />
              <Route path="healthcare" element={<UserHealthcarePage />} />
              <Route path="insurance" element={<UserInsurancePage />} />
              <Route path="impact" element={<UserSocialImpactPage />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="support" element={<SupportPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>

            {/* Admin CRM Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminOverviewPage />} />
              <Route path="users" element={<AdminUsersPage />} />
              <Route path="memberships" element={<UserMembershipPage />} />
              <Route path="rules" element={<AdminRulesPage />} />
              <Route path="points-ledger" element={<AdminPointsLedgerPage />} />
              <Route path="claims" element={<AdminClaimsPage />} />
              <Route path="redemptions" element={<AdminRedemptionsPage />} />
              <Route path="education" element={<AdminClaimsPage />} />
              <Route path="insurance" element={<AdminClaimsPage />} />
              <Route path="impact" element={<AdminClaimsPage />} />
              <Route path="payments" element={<AdminPointsLedgerPage />} />
              <Route path="support" element={<SupportPage />} />
              <Route path="master" element={<OwnerMasterControlPage />} />
              <Route path="inquiries" element={<AdminInquiriesPage />} />
              <Route path="audit-logs" element={<AdminAuditLogsPage />} />
            </Route>

            {/* Direct Owner Portal Route */}
            <Route path="/owner" element={<AdminLayout />}>
              <Route index element={<OwnerMasterControlPage />} />
            </Route>

            {/* Catch-all redirect to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
